import fetchContent from './fetchContent';
import fetchPageId from './fetchPageId';
import fetchRevisions from './fetchRevisions';

export default {
  ...fetchContent,
  ...fetchPageId,
  ...fetchRevisions,
};
