type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type CreatorsToActions<T> = Unwrap<ReturnTypes<T>>;

declare type Actions =
  | CreatorsToActions<typeof import('../../src/actions/Example')>
  | CreatorsToActions<typeof import('../../src/actions/Wiki/fetchPageId')>;

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
