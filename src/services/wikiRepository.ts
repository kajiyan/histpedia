import Repository from './repository';

const resource = '';

export function getPageId(titles: string) {
  return Repository.get<WikiPageIdResponse>(`${resource}`, {
    params: {
      action: 'query',
      format: 'json',
      formatversion: 'latest',
      utf8: 1,
      titles
    }
  });
}

export function getRevisions(pageid: number, rvstartid?: number) {
  let params = {
    action: 'query',
    pageids: pageid,
    prop: 'revisions',
    rvlimit: 100,
    rvprop: 'ids|timestamp|size',
    format: 'json',
    formatversion: 'latest',
    utf8: 1
  };

  if (rvstartid) {
    params = Object.assign({}, params, { rvstartid });
  }

  return Repository.get<WikiRevisionsResponse>(`${resource}`, { params });
}

export default {
  getPageId,
  getRevisions
};
