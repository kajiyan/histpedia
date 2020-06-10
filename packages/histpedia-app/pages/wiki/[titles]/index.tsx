import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import WikiActions from '../../../src/actions/Wiki';

const WikiPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  // URL エンコードする必要がある
  const { titles } = router.query;

  // string 型へのキャスト
  // title が undefined の場合 404 ページが表示されるので undefined の可能性はない
  dispatch(WikiActions.fetchPageId(titles as string));

  return <h1>wiki page {titles}</h1>;
};

export default WikiPage;
