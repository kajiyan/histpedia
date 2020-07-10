import * as Immutable from 'immutable';
import { format } from 'date-fns';

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

export default class History extends Immutable.Record(defaultValues) {
  formattedTimestamp(): string | undefined {
    if (typeof this.timestamp === 'undefined') {
      return this.timestamp;
    }

    return format(new Date(this.timestamp), 'MMM dd, yyyy hh:mm:ss aa');
  }
}
