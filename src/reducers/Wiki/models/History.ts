import * as Immutable from 'Immutable';

type Props = {
  pageid?: number;
  revid?: number;
  text?: string;
  title?: string;
};

const defaultValues: Props = {
  pageid: undefined,
  revid: undefined,
  text: undefined,
  title: undefined
};

export default class History extends Immutable.Record(defaultValues) {}
