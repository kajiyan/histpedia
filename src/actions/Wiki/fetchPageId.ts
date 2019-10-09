import { Dispatch } from 'redux';
import axios from 'axios';
import types from './types';

const jsonpAdapter = require('axios-jsonp');

export function asyncFetchPageIdStarted(dispatch: Dispatch) {
  dispatch({
    type: types.asyncFetchPageIdStarted
  });

  return {
    type: types.asyncFetchPageIdStarted
  };
}

export function asyncFetchPageIdDone(dispatch: Dispatch) {
  dispatch({
    type: types.asyncFetchPageIdDone
  });

  return {
    type: types.asyncFetchPageIdDone
  };
}

export function asyncFetchPageIdFailed(dispatch: Dispatch) {
  dispatch({
    type: types.asyncFetchPageIdFailed
  });

  return {
    type: types.asyncFetchPageIdFailed
  };
}

function fetchPageId(titles: string) {
  return async (dispatch: Dispatch) => {
    asyncFetchPageIdStarted(dispatch);

    console.log(titles)

    try {
      const result = await axios.get('http://ja.wikipedia.org/w/api.php', {
        adapter: jsonpAdapter,
        params: {
          action: 'query',
          format: 'json',
          formatversion: 'latest',
          utf8: 1,
          titles: 'ねこ'
        }
      });

      console.log(result);

      asyncFetchPageIdDone(dispatch);
    } catch (error) {
      asyncFetchPageIdFailed(dispatch);
    }
  };
}

export default {
  fetchPageId
};
