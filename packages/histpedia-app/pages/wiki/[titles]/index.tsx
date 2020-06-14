import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Wiki from '../../../src/components/templates/wiki';
import WikiActions from '../../../src/actions/Wiki';
import { StoreState } from '../../../src/store';

const WikiPage = (): JSX.Element => {
  console.log('WikiPage');
  const dispatch = useDispatch();

  const wikiState = useSelector((state: StoreState) => {
    return (({ pageid, initialized, entityIds }) => ({
      pageid,
      initialized,
      entityIds,
    }))(state.wiki.histories);
  }, shallowEqual);

  const { pageid, initialized, entityIds } = wikiState;
  const router = useRouter();
  // URL エンコードする必要がある
  const { titles } = router.query;

  useEffect(() => {
    if (initialized) {
      if (typeof pageid !== 'undefined') {
        if (entityIds.isEmpty()) {
          // pageid を取得済みかつ entityIds が未設定であれば Revision を取得する
          dispatch(WikiActions.fetchRevisions(pageid));
        }
      }
    } else {
      // string 型へのキャスト
      // title が undefined の場合 404 ページが表示されるので undefined の可能性はない
      dispatch(WikiActions.fetchPageId(titles as string));
    }

    return () => {
      if (initialized && typeof pageid !== 'undefined') {
        // Todo: ステートの初期化をする
        console.log('[WikiPage] useEffect clean', pageid, initialized);
      }
    };
  }, [dispatch, entityIds, initialized, pageid, titles]);

  return (
    <>
      <h1>
        wiki page {titles} {pageid}
      </h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <br />
      <br />
      <div>
        <Wiki entityIds={entityIds} />
      </div>
      <br />
      <br />
      <br />
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
