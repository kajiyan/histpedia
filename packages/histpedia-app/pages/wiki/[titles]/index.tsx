import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Wiki from '../../../src/components/templates/wiki';
import WikiActions from '../../../src/actions/Wiki';
import { StoreState } from '../../../src/store';

const WikiPage = (): JSX.Element => {
  console.log('WikiPage');

  const router = useRouter();
  const dispatch = useDispatch();
  const wikiState = useSelector((state: StoreState) => {
    return (({ pageid, entityIds }) => ({
      pageid,
      entityIds,
    }))(state.wiki.histories);
  }, shallowEqual);

  const { pageid, entityIds } = wikiState;
  const { titles } = router.query; // URL デコtードする必要がある？

  useEffect(() => {
    if (typeof pageid === 'undefined') {
      // pageID の取得をする
      // string 型へキャストしているが title が undefined の場合は
      // 404 ページが表示されるので undefined の可能性はない
      dispatch(WikiActions.fetchPageId(titles as string));
    } else if (entityIds.isEmpty()) {
      // pageid を取得済みかつ entityIds が未設定であれば Revision の ID を取得する
      dispatch(WikiActions.fetchRevisions(pageid));
    }

    return () => {
      console.log('%c[WikiPage] useEffect clean', 'color: green');
    };
  }, [dispatch, entityIds, pageid, titles]);

  if (entityIds.isEmpty()) {
    return <div>Loading</div>;
  }

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
        PageID: {pageid}
        <br />
        Revisions: {entityIds.size}
      </a>
    </>
  );
};

export default WikiPage;
