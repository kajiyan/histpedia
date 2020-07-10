import controller from './controller';
import fetchContent from './fetchContent';
import fetchDiffContent from './fetchDiffContent';
import fetchPageId from './fetchPageId';
import fetchRevisions from './fetchRevisions';
import fetchStylesheet from './fetchStyleSheet';

export default {
  ...controller,
  ...fetchContent,
  ...fetchDiffContent,
  ...fetchPageId,
  ...fetchRevisions,
  ...fetchStylesheet,
};
