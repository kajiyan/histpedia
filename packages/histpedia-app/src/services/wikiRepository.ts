import { AxiosResponse } from 'axios';
import Repository from './repository';

const url = 'https://ja.wikipedia.org/w/api.php';

export function getContent(
  oldid: number
): Promise<AxiosResponse<WikiContentResponse>> {
  const params = {
    action: 'parse',
    prop: 'text',
    disablelimitreport: 1,
    disableeditsection: 1,
    disabletoc: 1,
    format: 'json',
    formatversion: 'latest',
    oldid,
    utf8: 1,
  };

  return Repository.get<WikiContentResponse>(url, { params });
}

export function getPageId(
  titles: string
): Promise<AxiosResponse<WikiPageIdResponse>> {
  return Repository.get<WikiPageIdResponse>(url, {
    params: {
      action: 'query',
      format: 'json',
      formatversion: 'latest',
      utf8: 1,
      titles,
    },
  });
}

export function getRevisions(
  pageid: number,
  rvstartid?: number
): Promise<AxiosResponse<WikiRevisionsResponse>> {
  let params: {
    action: 'query';
    pageids: number;
    prop: 'revisions';
    rvlimit: 'max';
    rvprop: 'ids|timestamp|size';
    rvstartid?: number;
    format: 'json';
    formatversion: 'latest';
    utf8: 0 | 1;
  } = {
    action: 'query',
    pageids: pageid,
    prop: 'revisions',
    rvlimit: 'max',
    rvprop: 'ids|timestamp|size',
    format: 'json',
    formatversion: 'latest',
    utf8: 1,
  };

  if (rvstartid) {
    params = { ...params, rvstartid };
  }

  return Repository.get<WikiRevisionsResponse>(url, {
    params,
  });
}

export default {
  getContent,
  getPageId,
  getRevisions,
};
