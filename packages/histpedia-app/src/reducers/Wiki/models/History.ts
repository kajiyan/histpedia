import * as Immutable from 'immutable';

type Props = {
  diffHTML?: string;
  pageid?: number;
  revid?: number;
  text?: string;
  title?: string;
};

const defaultValues: Props = {
  diffHTML: undefined,
  pageid: undefined,
  revid: undefined,
  text: undefined,
  title: undefined,
};

export default class History extends Immutable.Record(defaultValues) {}
