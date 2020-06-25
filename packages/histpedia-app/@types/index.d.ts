type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type CreatorsToActions<T> = Unwrap<ReturnTypes<T>>;

declare module 'worker-loader?name=static/[hash].worker.js!*' {
  class WebpackWorker extends Worker {
    constructor()
  }

  export default WebpackWorker
}

declare type Actions =
  | CreatorsToActions<typeof import('../src/actions/Wiki/controller')>
  | CreatorsToActions<typeof import('../src/actions/Wiki/fetchContent')>
  | CreatorsToActions<typeof import('../src/actions/Wiki/fetchDiffContent')>
  | CreatorsToActions<typeof import('../src/actions/Wiki/fetchPageId')>
  | CreatorsToActions<typeof import('../src/actions/Wiki/fetchRevisions')>
  | CreatorsToActions<typeof import('../src/actions/Wiki/fetchStyleSheet')>;

declare type WikiContent = {
  pageid: number;
  revid: number;
  text: string;
  title: string;
};

declare type WikiContentResponse = {
  error?: {
    code: string;
    docref: string;
    info: string;
  };
  parse?: WikiContent;
  servedby?: string;
};

declare type WikiPageIdResponse = {
  batchcomplete: boolean;
  query: {
    normalized: {
      fromencoded: boolean;
      from: string;
      to: string;
    }[];
    pages: {
      pageid?: number;
      ns: number;
      title: string;
      missing?: boolean;
    }[];
  };
};

declare type WikiRevision = {
  revid: number;
  parentid: number;
  timestamp: string;
  size: number;
};

declare type WikiRevisionsResponse = {
  batchcomplete: boolean;
  limits: {
    revisions: number;
  };
  query: {
    pages: {
      pageid?: number;
      ns: number;
      revisions: WikiRevision[];
      title: string;
      missing?: boolean;
    }[];
  };
};
