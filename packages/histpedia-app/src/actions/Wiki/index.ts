import controller from './controller';
import fetchContent from './fetchContent';
import fetchPageId from './fetchPageId';
import fetchRevisions from './fetchRevisions';

export default {
  ...controller,
  ...fetchContent,
  ...fetchPageId,
  ...fetchRevisions,
};
