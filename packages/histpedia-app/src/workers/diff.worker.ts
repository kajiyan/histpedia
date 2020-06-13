// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-restricted-globals
// const ctx: Worker = self as any;

type Operation = {
  action: string;
  startInBefore: number;
  endInBefore?: number;
  startInAfter: number;
  endInAfter?: number;
};

class Match {
  endInAfter: number;

  endInBefore: number;

  length: number;

  startInAfter: number;

  startInBefore: number;

  constructor(startInBefore: number, startInAfter: number, length: number) {
    this.startInBefore = startInBefore;
    this.startInAfter = startInAfter;
    this.length = length;
    this.endInBefore = this.startInBefore + this.length - 1;
    this.endInAfter = this.startInAfter + this.length - 1;
  }
}

/**
 * htmlToTokens
 */
const htmlToTokens = (html: string) => {
  const tokens = [];
  let char: string;
  let currentWord = '';
  let mode = 'char';

  for (let i = 0, len = html.length; i < len; i += 1) {
    char = html[i];

    switch (mode) {
      case 'tag': {
        if (char === '>') {
          currentWord += '>';
          tokens[tokens.length] = currentWord;
          currentWord = '';

          if (/^\s+$/.test(char)) {
            mode = 'whitespace';
          } else {
            mode = 'char';
          }
        } else {
          currentWord += char;
        }
        break;
      }
      case 'char': {
        if (char === '<') {
          if (currentWord) {
            tokens[tokens.length] = currentWord;
          }

          currentWord = '<';
          mode = 'tag';
        } else if (/\s/.test(char)) {
          if (currentWord) {
            tokens[tokens.length] = currentWord;
          }

          currentWord = char;
          mode = 'whitespace';
        } else if (/[\w#@]+/i.test(char)) {
          currentWord += char;
        } else {
          if (currentWord) {
            tokens[tokens.length] = currentWord;
          }

          currentWord = char;
        }
        break;
      }
      case 'whitespace': {
        if (char === '<') {
          if (currentWord) {
            tokens[tokens.length] = currentWord;
          }

          currentWord = '<';
          mode = 'tag';
        } else if (/^\s+$/.test(char)) {
          currentWord += char;
        } else {
          if (currentWord) {
            tokens[tokens.length] = currentWord;
          }

          currentWord = char;
          mode = 'char';
        }
        break;
      }
      default: {
        throw new Error(`[diffWorker] Unknown mode ${mode}`);
      }
    }
  }

  if (currentWord) {
    tokens[tokens.length] = currentWord;
  }

  return tokens;
};

/**
 * createIndex (create_index)
 */
const createIndex = (tokensA: string[], tokensB: string[]) => {
  const indexes: { [key: string]: number[] } = {};

  for (let i = 0, len = tokensA.length; i < len; i += 1) {
    const token = tokensA[i];
    let index = tokensB.indexOf(token);
    indexes[token] = [];
    while (index !== -1) {
      indexes[token][indexes[token].length] = index;
      index = tokensB.indexOf(token, index + 1);
    }
  }

  return indexes;
};

/**
 * findMatch (find_match)
 */
const findMatch = (
  tokensA: string[],
  startInBefore: number,
  endInBefore: number,
  startInAfter: number,
  endInAfter: number,
  indexOfBeforeLocationsInAfterTokens: {
    [key: string]: number[];
  }
) => {
  let bestMatchInAfter = startInAfter;
  let bestMatchInBefore = startInBefore;
  let bestMatchLength = 0;
  let match: Match | undefined;
  let matchLengthAt: {
    [key: string]: number;
  } = {};
  let indexInBefore = startInBefore;

  for (
    let i = startInBefore;
    i <= endInBefore ? i < endInBefore : i > endInBefore;
    indexInBefore = i <= endInBefore ? (i += 1) : (i -= 1)
  ) {
    const newMatchLengthAt: {
      [key: string]: number;
    } = {};
    const lookingFor = tokensA[indexInBefore];
    const locationsInAfter = indexOfBeforeLocationsInAfterTokens[lookingFor];

    for (let j = 0, len = locationsInAfter.length; j < len; j += 1) {
      const indexInAfter = locationsInAfter[j];

      if (indexInAfter < startInAfter) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (indexInAfter >= endInAfter) {
        break;
      }

      if (matchLengthAt[indexInAfter - 1] == null) {
        matchLengthAt[indexInAfter - 1] = 0;
      }

      const newMatchLength = matchLengthAt[indexInAfter - 1] + 1;

      newMatchLengthAt[indexInAfter] = newMatchLength;

      if (newMatchLength > bestMatchLength) {
        bestMatchInBefore = indexInBefore - newMatchLength + 1;
        bestMatchInAfter = indexInAfter - newMatchLength + 1;
        bestMatchLength = newMatchLength;
      }
    }

    matchLengthAt = newMatchLengthAt;
  }

  if (bestMatchLength !== 0) {
    match = new Match(bestMatchInBefore, bestMatchInAfter, bestMatchLength);
  }

  return match;
};

/**
 * recursivelyFindMatchingBlocks (recursively_find_matching_blocks)
 */
const recursivelyFindMatchingBlocks = (
  tokensA: string[],
  tokensB: string[],
  indexOfBeforeLocationsInAfterTokens: {
    [key: string]: number[];
  },
  startInBefore: number,
  endInBefore: number,
  startInAfter: number,
  endInAfter: number,
  matchingBlocks: Match[] = []
) => {
  const match = findMatch(
    tokensA,
    startInBefore,
    endInBefore,
    startInAfter,
    endInAfter,
    indexOfBeforeLocationsInAfterTokens
  );

  if (typeof match !== 'undefined') {
    if (
      startInBefore < match.startInBefore &&
      startInAfter < match.startInAfter
    ) {
      recursivelyFindMatchingBlocks(
        tokensA,
        tokensB,
        indexOfBeforeLocationsInAfterTokens,
        startInBefore,
        match.startInBefore,
        startInAfter,
        match.startInAfter,
        matchingBlocks
      );
    }

    matchingBlocks.push(match);

    if (match.endInBefore <= endInBefore && match.endInAfter <= endInAfter) {
      recursivelyFindMatchingBlocks(
        tokensA,
        tokensB,
        indexOfBeforeLocationsInAfterTokens,
        match.endInBefore + 1,
        endInBefore,
        match.endInAfter + 1,
        endInAfter,
        matchingBlocks
      );
    }
  }

  return matchingBlocks;
};

/**
 * findMatchingBlocks (find_matching_blocks)
 */
const findMatchingBlocks = (tokensA: string[], tokensB: string[]) => {
  const indexOfBeforeLocationsInAfterTokens = createIndex(tokensA, tokensB);
  const endInBefore = tokensA.length;
  const endInAfter = tokensB.length;

  return recursivelyFindMatchingBlocks(
    tokensA,
    tokensB,
    indexOfBeforeLocationsInAfterTokens,
    0,
    endInBefore,
    0,
    endInAfter
  );
};

/**
 * calculateOperations
 */
const calculateOperations = (tokensA: string[], tokensB: string[]) => {
  const actionMap: {
    [key: string]: string;
  } = {
    'false,false': 'replace',
    'true,false': 'insert',
    'false,true': 'delete',
    'true,true': 'none',
  };
  const matches = findMatchingBlocks(tokensA, tokensB);
  let positionInAfter = 0;
  let positionInBefore = 0;
  const operations: Array<Operation> = [];
  let lastOperation: {
    action: string;
    endInBefore?: number;
    endInAfter?: number;
  } = {
    action: 'none',
  };
  const postProcessed = [];

  matches[matches.length] = new Match(tokensA.length, tokensB.length, 0);

  for (let i = 0, len = matches.length; i < len; i += 1) {
    const match = matches[i];
    const matchStartsAtCurrentPositionInBefore =
      positionInBefore === match.startInBefore;
    const matchStartsAtCurrentPositionInAfter =
      positionInAfter === match.startInAfter;
    const actionUpToMatchPositions =
      actionMap[
        [
          matchStartsAtCurrentPositionInBefore,
          matchStartsAtCurrentPositionInAfter,
        ].toString()
      ];

    if (actionUpToMatchPositions !== 'none') {
      operations[operations.length] = {
        action: actionUpToMatchPositions,
        startInBefore: positionInBefore,
        endInBefore:
          actionUpToMatchPositions !== 'insert'
            ? match.startInBefore - 1
            : undefined,
        startInAfter: positionInAfter,
        endInAfter:
          actionUpToMatchPositions !== 'delete'
            ? match.startInAfter - 1
            : undefined,
      };
    }

    if (match.length !== 0) {
      operations[operations.length] = {
        action: 'equal',
        startInBefore: match.startInBefore,
        endInBefore: match.endInBefore,
        startInAfter: match.startInAfter,
        endInAfter: match.endInAfter,
      };
    }

    positionInAfter = match.endInAfter + 1;
    positionInBefore = match.endInBefore + 1;
  }

  console.log(operations);

  for (let i = 0, len = operations.length; i < len; i += 1) {
    const operation = operations[i];

    if (operation.action !== 'equal') {
      postProcessed[postProcessed.length] = operation;
      lastOperation = operation;
      // eslint-disable-next-line no-continue
      continue;
    }

    if (
      typeof operation.endInBefore !== 'undefined' &&
      operation.endInBefore - operation.startInBefore !== 0
    ) {
      postProcessed[postProcessed.length] = operation;
      lastOperation = operation;
      // eslint-disable-next-line no-continue
      continue;
    }

    if (
      typeof operation.endInBefore !== 'undefined' &&
      /^\s$/.test(
        tokensA
          .slice(operation.startInBefore, +operation.endInBefore + 1 || 9e9)
          .join('')
      ) &&
      lastOperation.action === 'replace'
    ) {
      lastOperation.endInBefore = operation.endInBefore;
      lastOperation.endInAfter = operation.endInAfter;
    }
  }

  return postProcessed;
};

/**
 * consecutiveWhere
 */
const consecutiveWhere = (start: number, content: string[], isnt: boolean) => {
  let answer;
  let lastMatchingIndex: number | undefined;
  const sliceContent = content.slice(start, +content.length + 1 || 9e9);

  if (isnt) {
    for (let i = 0, len = sliceContent.length; i < len; i += 1) {
      answer = /^\s*<[^>]+>\s*$/.test(sliceContent[i]);

      if (answer === true) {
        lastMatchingIndex = i;
      }

      if (answer === false) {
        break;
      }
    }
  } else {
    for (let i = 0, len = sliceContent.length; i < len; i += 1) {
      answer = !/^\s*<[^>]+>\s*$/.test(sliceContent[i]);

      if (answer === true) {
        lastMatchingIndex = i;
      }

      if (answer === false) {
        break;
      }
    }
  }

  if (typeof lastMatchingIndex !== 'undefined') {
    return sliceContent.slice(0, +lastMatchingIndex + 1 || 9e9);
  }

  return [];
};

const insWrap = (content: string[]) => {
  const { length } = content;
  let position = 0;
  let rendering = '';
  let condition = true;

  while (condition) {
    if (position >= length) {
      condition = false;
      break;
    }

    const nonTags = consecutiveWhere(position, content, false);
    position += nonTags.length;

    if (nonTags.length !== 0) {
      rendering += `<ins>${nonTags.join('')}</ins>`;
    }

    if (position >= length) {
      condition = false;
      break;
    }

    const tags = consecutiveWhere(position, content, true);
    position += tags.length;
    rendering += tags.join('');
  }

  return rendering;
};

const delWrap = (content: string[]) => {
  const { length } = content;
  let position = 0;
  let rendering = '';
  let condition = true;

  while (condition) {
    if (position >= length) {
      condition = false;
      break;
    }

    const nonTags = consecutiveWhere(position, content, false);
    position += nonTags.length;

    if (nonTags.length !== 0) {
      rendering += `<del>${nonTags.join('')}</del>`;
    }

    if (position >= length) {
      condition = false;
      break;
    }

    const tags = consecutiveWhere(position, content, true);
    position += tags.length;
    rendering += tags.join('');
  }

  return rendering;
};

// operationMap (op_map)
const operationMap = (
  tokensA: string[],
  tokensB: string[],
  action: string,
  operation: Operation
) => {
  let result = '';

  switch (action) {
    case 'equal': {
      if (typeof operation.endInBefore !== 'undefined') {
        result = tokensA
          .slice(operation.startInBefore, +operation.endInBefore + 1 || 9e9)
          .join('');
      }
      break;
    }
    case 'insert': {
      if (typeof operation.endInAfter !== 'undefined') {
        result = insWrap(
          tokensB.slice(
            operation.startInAfter,
            +operation.endInAfter + 1 || 9e9
          )
        );
      }
      break;
    }
    case 'delete': {
      if (typeof operation.endInBefore !== 'undefined') {
        result = delWrap(
          tokensA.slice(
            operation.startInBefore,
            +operation.endInBefore + 1 || 9e9
          )
        );
      }
      break;
    }
    case 'replace': {
      if (
        typeof operation.endInBefore !== 'undefined' &&
        typeof operation.endInAfter !== 'undefined'
      ) {
        const del = delWrap(
          tokensA.slice(
            operation.startInBefore,
            +operation.endInBefore + 1 || 9e9
          )
        );

        const ins = insWrap(
          tokensB.slice(
            operation.startInAfter,
            +operation.endInAfter + 1 || 9e9
          )
        );

        result = del + ins;
      }
      break;
    }
    default: {
      break;
    }
  }

  return result;
};

/**
 * renderOperations (render_operations)
 */
const renderOperations = (
  tokensA: string[],
  tokensB: string[],
  operations: ReturnType<typeof calculateOperations>
) => {
  let rendering = '';

  for (let i = 0, len = operations.length; i < len; i += 1) {
    const operation = operations[i];
    rendering += operationMap(tokensA, tokensB, operation.action, operation);
  }

  return rendering;
};

/**
 * diffHtml
 */
const diffHtml = (htmlA: string, htmlB: string) => {
  const tokensA = htmlToTokens(htmlA);
  const tokensB = htmlToTokens(htmlB);
  const operations = calculateOperations(tokensA, tokensB);

  // console.log(operations);

  console.log(renderOperations(tokensA, tokensB, operations));

  return 'result';
};

self.addEventListener(
  'message',
  async (event: { data: { htmlA: string; htmlB: string } }) => {
    console.log('worker側だよ！！ 受け取った値は', event.data);

    const html = diffHtml(event.data.htmlA, event.data.htmlB);
    self.postMessage({ html });
  }
);

// export default ctx;
export default {};
