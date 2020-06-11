import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import WikiActions from '../../../src/actions/Wiki';
import { StoreState } from '../../../src/store';

const WikiPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const wikiState = useSelector((state: StoreState) => state.wiki);
  const { pageid, initialized, entityIds } = wikiState.histories;
  const router = useRouter();
  // URL エンコードする必要がある
  const { titles } = router.query;

  useEffect(() => {
    console.log('useEffect', pageid, initialized);

    if (initialized) {
      if (!(typeof pageid === 'undefined')) {
        if (entityIds.isEmpty()) {
          // pageid を取得済みかつ entityIds が未設定であれば Revision を取得する
          dispatch(WikiActions.fetchRevisions(pageid));
        } else {
          // pageid を取得済みかつ entityIds が設定済みであれば Context を取得する
          // Todo: 記事を取得する
        }
      }
    } else {
      // string 型へのキャスト
      // title が undefined の場合 404 ページが表示されるので undefined の可能性はない
      dispatch(WikiActions.fetchPageId(titles as string));
    }

    return () => {
      if (initialized && !(typeof pageid === 'undefined')) {
        // Todo: ステートの初期化をする
        console.log('useEffect clean', pageid, initialized);
      }
    };
  }, [initialized, pageid, dispatch, titles, entityIds]);

  return (
    <>
      <h1>
        wiki page {titles} {pageid}
      </h1>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      <a
        href={`https://ja.wikipedia.org/w/index.php?curid=${pageid}`}
        rel="noreferrer noopener"
        target="_blank"
      >
        {titles}
        <br />
        PageID: {pageid}
        <br />
        Revisions: {entityIds.size}
      </a>
    </>
  );
};

export default WikiPage;
