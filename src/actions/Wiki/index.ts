import fetchContent from './fetchContent';
import fetchPageId from './fetchPageId';
import fetchRevisions from './fetchRevisions';
import updateCurrentRevisionId from './updateCurrentRevisionId';
import updatePrevRevisionId from './updatePrevRevisionId';

export default {
  ...fetchContent,
  ...fetchPageId,
  ...fetchRevisions,
  ...updateCurrentRevisionId,
  ...updatePrevRevisionId
};
