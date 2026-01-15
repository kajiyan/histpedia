// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

// fast-myers-diff をインポート (Web Worker内で動的インポート)
// @ts-expect-error - fast-myers-diff の型定義
import { diff as myersDiff } from 'fast-myers-diff';

type Operation = {
  action: string;
  startInBefore: number;
  endInBefore?: number;
  startInAfter: number;
  endInAfter?: number;
};

// プリコンパイルされた正規表現（パフォーマンス最適化）
const TAG_PATTERN = /^<[^>]+>$/;

// 文字コード定数（charCodeAt用）
const CHAR_LT = 60; // '<'
const CHAR_GT = 62; // '>'
const CHAR_SPACE = 32;
const CHAR_TAB = 9;
const CHAR_LF = 10;
const CHAR_CR = 13;

/**
 * 高速な空白文字判定
 */
const isWhitespaceChar = (code: number): boolean =>
  code === CHAR_SPACE || code === CHAR_TAB || code === CHAR_LF || code === CHAR_CR;

/**
 * 高速な単語文字判定 (a-z, A-Z, 0-9, _, #, @)
 */
const isWordChar = (code: number): boolean =>
  (code >= 97 && code <= 122) || // a-z
  (code >= 65 && code <= 90) || // A-Z
  (code >= 48 && code <= 57) || // 0-9
  code === 95 || // _
  code === 35 || // #
  code === 64; // @

/**
 * 最適化されたHTMLトークナイザー
 * - charCodeAtによる高速文字判定
 * - 事前確保された配列
 */
const htmlToTokens = (html: string): string[] => {
  const len = html.length;
  if (len === 0) return [];

  const tokens: string[] = [];
  let currentWord = '';
  let mode: 'char' | 'tag' | 'whitespace' = 'char';
  let i = 0;

  while (i < len) {
    const code = html.charCodeAt(i);

    switch (mode) {
      case 'tag': {
        currentWord += html[i];
        if (code === CHAR_GT) {
          tokens.push(currentWord);
          currentWord = '';
          mode = 'char';
        }
        break;
      }
      case 'char': {
        if (code === CHAR_LT) {
          if (currentWord) {
            tokens.push(currentWord);
            currentWord = '';
          }
          currentWord = '<';
          mode = 'tag';
        } else if (isWhitespaceChar(code)) {
          if (currentWord) {
            tokens.push(currentWord);
            currentWord = '';
          }
          currentWord = html[i];
          mode = 'whitespace';
        } else if (isWordChar(code)) {
          currentWord += html[i];
        } else {
          if (currentWord) {
            tokens.push(currentWord);
          }
          currentWord = html[i];
        }
        break;
      }
      case 'whitespace': {
        if (code === CHAR_LT) {
          if (currentWord) {
            tokens.push(currentWord);
            currentWord = '';
          }
          currentWord = '<';
          mode = 'tag';
        } else if (isWhitespaceChar(code)) {
          currentWord += html[i];
        } else {
          if (currentWord) {
            tokens.push(currentWord);
            currentWord = '';
          }
          currentWord = html[i];
          mode = 'char';
        }
        break;
      }
    }
    i++;
  }

  if (currentWord) {
    tokens.push(currentWord);
  }

  return tokens;
};

/**
 * 共通接頭辞の長さを検出
 */
const findCommonPrefixLength = (a: string[], b: string[]): number => {
  const minLen = Math.min(a.length, b.length);
  let i = 0;
  while (i < minLen && a[i] === b[i]) i++;
  return i;
};

/**
 * 共通接尾辞の長さを検出
 */
const findCommonSuffixLength = (
  a: string[],
  b: string[],
  prefixLen: number
): number => {
  const minLen = Math.min(a.length, b.length) - prefixLen;
  let i = 0;
  while (i < minLen && a[a.length - 1 - i] === b[b.length - 1 - i]) i++;
  return i;
};

/**
 * Myers diffアルゴリズムを使用してオペレーションを計算
 * - fast-myers-diff ライブラリを使用
 * - 共通接頭辞/接尾辞を事前に除外してdiff範囲を最小化
 */
const calculateOperations = (
  tokensA: string[],
  tokensB: string[]
): Operation[] => {
  // 共通接頭辞/接尾辞を検出
  const prefixLen = findCommonPrefixLength(tokensA, tokensB);
  const suffixLen = findCommonSuffixLength(tokensA, tokensB, prefixLen);

  // 完全一致の場合
  if (prefixLen + suffixLen >= tokensA.length && prefixLen + suffixLen >= tokensB.length) {
    // 全て equal
    if (tokensA.length === 0) return [];
    return [{
      action: 'equal',
      startInBefore: 0,
      endInBefore: tokensA.length - 1,
      startInAfter: 0,
      endInAfter: tokensB.length - 1,
    }];
  }

  const operations: Operation[] = [];

  // 共通接頭辞がある場合
  if (prefixLen > 0) {
    operations.push({
      action: 'equal',
      startInBefore: 0,
      endInBefore: prefixLen - 1,
      startInAfter: 0,
      endInAfter: prefixLen - 1,
    });
  }

  // 中間部分のdiff計算（接頭辞/接尾辞を除外）
  const aMiddle = tokensA.slice(prefixLen, tokensA.length - suffixLen);
  const bMiddle = tokensB.slice(prefixLen, tokensB.length - suffixLen);

  if (aMiddle.length > 0 || bMiddle.length > 0) {
    // fast-myers-diff を使用
    let lastAEnd = 0;
    let lastBEnd = 0;

    for (const [sx, ex, sy, ey] of myersDiff(aMiddle, bMiddle)) {
      // equal部分（前回の終端から今回の開始まで）
      if (sx > lastAEnd) {
        operations.push({
          action: 'equal',
          startInBefore: prefixLen + lastAEnd,
          endInBefore: prefixLen + sx - 1,
          startInAfter: prefixLen + lastBEnd,
          endInAfter: prefixLen + sy - 1,
        });
      }

      // diff操作
      const deleteLen = ex - sx;
      const insertLen = ey - sy;

      if (deleteLen > 0 && insertLen > 0) {
        // replace
        operations.push({
          action: 'replace',
          startInBefore: prefixLen + sx,
          endInBefore: prefixLen + ex - 1,
          startInAfter: prefixLen + sy,
          endInAfter: prefixLen + ey - 1,
        });
      } else if (deleteLen > 0) {
        // delete
        operations.push({
          action: 'delete',
          startInBefore: prefixLen + sx,
          endInBefore: prefixLen + ex - 1,
          startInAfter: prefixLen + sy,
        });
      } else if (insertLen > 0) {
        // insert
        operations.push({
          action: 'insert',
          startInBefore: prefixLen + sx,
          startInAfter: prefixLen + sy,
          endInAfter: prefixLen + ey - 1,
        });
      }

      lastAEnd = ex;
      lastBEnd = ey;
    }

    // 残りのequal部分
    if (lastAEnd < aMiddle.length) {
      operations.push({
        action: 'equal',
        startInBefore: prefixLen + lastAEnd,
        endInBefore: prefixLen + aMiddle.length - 1,
        startInAfter: prefixLen + lastBEnd,
        endInAfter: prefixLen + bMiddle.length - 1,
      });
    }
  }

  // 共通接尾辞がある場合
  if (suffixLen > 0) {
    operations.push({
      action: 'equal',
      startInBefore: tokensA.length - suffixLen,
      endInBefore: tokensA.length - 1,
      startInAfter: tokensB.length - suffixLen,
      endInAfter: tokensB.length - 1,
    });
  }

  return operations;
};

/**
 * タグかどうかを判定（キャッシュ付き）
 */
const isTag = (token: string): boolean => TAG_PATTERN.test(token);

/**
 * consecutiveWhere - タグ/非タグの連続要素を取得
 */
const consecutiveWhere = (
  start: number,
  content: string[],
  findTags: boolean
): string[] => {
  const result: string[] = [];
  const len = content.length;

  for (let i = start; i < len; i++) {
    const token = content[i];
    const tokenIsTag = isTag(token);

    if (findTags === tokenIsTag) {
      result.push(token);
    } else {
      break;
    }
  }

  return result;
};

/**
 * 挿入テキストをラップ（タグは除外）
 */
const insWrap = (content: string[]): string => {
  const len = content.length;
  if (len === 0) return '';

  const parts: string[] = [];
  let position = 0;

  while (position < len) {
    // 非タグを収集
    const nonTags = consecutiveWhere(position, content, false);
    position += nonTags.length;

    if (nonTags.length > 0) {
      parts.push('<ins>', ...nonTags, '</ins>');
    }

    if (position >= len) break;

    // タグを収集（そのまま出力）
    const tags = consecutiveWhere(position, content, true);
    position += tags.length;
    parts.push(...tags);
  }

  return parts.join('');
};

/**
 * 削除テキストをラップ（タグは除外）
 */
const delWrap = (content: string[]): string => {
  const len = content.length;
  if (len === 0) return '';

  const parts: string[] = [];
  let position = 0;

  while (position < len) {
    // 非タグを収集
    const nonTags = consecutiveWhere(position, content, false);
    position += nonTags.length;

    if (nonTags.length > 0) {
      parts.push('<del>', ...nonTags, '</del>');
    }

    if (position >= len) break;

    // タグを収集（そのまま出力）
    const tags = consecutiveWhere(position, content, true);
    position += tags.length;
    parts.push(...tags);
  }

  return parts.join('');
};

/**
 * オペレーションをHTMLにレンダリング
 * - 配列に蓄積して最後にjoin（文字列連結より高速）
 */
const renderOperations = (
  tokensA: string[],
  tokensB: string[],
  operations: Operation[]
): string => {
  const parts: string[] = [];

  for (let i = 0, len = operations.length; i < len; i++) {
    const op = operations[i];

    switch (op.action) {
      case 'equal': {
        if (op.endInBefore !== undefined) {
          for (let j = op.startInBefore; j <= op.endInBefore; j++) {
            parts.push(tokensA[j]);
          }
        }
        break;
      }
      case 'insert': {
        if (op.endInAfter !== undefined) {
          const slice = tokensB.slice(op.startInAfter, op.endInAfter + 1);
          parts.push(insWrap(slice));
        }
        break;
      }
      case 'delete': {
        if (op.endInBefore !== undefined) {
          const slice = tokensA.slice(op.startInBefore, op.endInBefore + 1);
          parts.push(delWrap(slice));
        }
        break;
      }
      case 'replace': {
        if (op.endInBefore !== undefined && op.endInAfter !== undefined) {
          const delSlice = tokensA.slice(op.startInBefore, op.endInBefore + 1);
          const insSlice = tokensB.slice(op.startInAfter, op.endInAfter + 1);
          parts.push(delWrap(delSlice));
          parts.push(insWrap(insSlice));
        }
        break;
      }
    }
  }

  return parts.join('');
};

/**
 * HTMLの差分を計算
 */
const diffHtml = (htmlA: string, htmlB: string): string => {
  // 完全一致の場合は早期リターン
  if (htmlA === htmlB) return htmlA;

  const tokensA = htmlToTokens(htmlA);
  const tokensB = htmlToTokens(htmlB);

  // トークンが空の場合のエッジケース
  if (tokensA.length === 0 && tokensB.length === 0) return '';
  if (tokensA.length === 0) return insWrap(tokensB);
  if (tokensB.length === 0) return delWrap(tokensA);

  const operations = calculateOperations(tokensA, tokensB);
  return renderOperations(tokensA, tokensB, operations);
};

ctx.addEventListener(
  'message',
  async (event: { data: { htmlA: string; htmlB: string } }) => {
    const html = diffHtml(event.data.htmlA, event.data.htmlB);
    ctx.postMessage({ html });
  }
);
