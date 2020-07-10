import axios, { AxiosResponse } from 'axios';
import Repository from './repository';
import { IS_MOBILE } from '../utils/browser';

const url = 'https://ja.wikipedia.org/w/api.php';

export function getContent(
  oldid: number
): Promise<AxiosResponse<WikiContentResponse>> {
  const mobileParams = IS_MOBILE ? { mobileformat: 1, mainpage: 1 } : {};
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
    ...mobileParams,
  };

  return Repository.get<WikiContentResponse>(
    'https://ja.wikipedia.org/w/api.php',
    { params }
  );
}

export function getPageId(
  titles: string
): Promise<AxiosResponse<WikiPageIdResponse>> {
  return Repository.get<WikiPageIdResponse>(url, {
    params: {
      action: 'query',
      format: 'json',
      formatversion: 'latest',
      redirects: 1,
      titles,
      utf8: 1,
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
    rvprop: 'ids|size|timestamp|user';
    rvstartid?: number;
    format: 'json';
    formatversion: 'latest';
    utf8: 0 | 1;
  } = {
    action: 'query',
    pageids: pageid,
    prop: 'revisions',
    rvlimit: 'max',
    rvprop: 'ids|size|timestamp|user',
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

export function getStylesheet(title: string): Promise<AxiosResponse<string>> {
  const endPoint = IS_MOBILE ? 'mobile-html' : 'html';

  return axios.get<string>(
    `https://ja.wikipedia.org/api/rest_v1/page/${endPoint}/${encodeURIComponent(
      title
    )}`
  );
}

export default {
  getContent,
  getPageId,
  getRevisions,
  getStylesheet,
};
