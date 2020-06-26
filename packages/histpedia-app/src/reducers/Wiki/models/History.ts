import * as Immutable from 'immutable';

type Props = {
  diffBytes: number;
  diffHTML?: string;
  pageid?: number;
  revid?: number;
  text?: string;
  timestamp?: string;
  title?: string;
  user?: string;
};

const defaultValues: Props = {
  diffBytes: 0,
  diffHTML: undefined,
  pageid: undefined,
  revid: undefined,
  text: undefined,
  timestamp: undefined,
  title: undefined,
  user: undefined,
};

export default class History extends Immutable.Record(defaultValues) {}
