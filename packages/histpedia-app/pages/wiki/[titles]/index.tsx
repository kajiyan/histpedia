import React, { useEffect } from 'react';
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
    return (({ currentTitle, entityIds, stylesheets, pageid, title }) => ({
      currentTitle,
      entityIds,
      stylesheets,
      pageid,
      title,
    }))(state.wiki.histories);
  }, shallowEqual);

  const { currentTitle, entityIds, stylesheets, pageid, title } = wikiState;
  // string 型へキャスト、titles が undefined の場合は 404 ページが表示されるので undefined の可能性はない
  const titles = decodeURIComponent(router.query.titles as string);

  useEffect(() => {
    // pageID が未取得、あるいは前回の開いた wiki/[titles] と
    // タイトルが異なっていれば pageID を再取得する
    if (typeof pageid === 'undefined' || currentTitle !== titles) {
      dispatch(WikiActions.fetchPageId(titles as string));
    }

    if (
      typeof pageid !== 'undefined' &&
      entityIds.isEmpty() &&
      stylesheets.isEmpty()
    ) {
      // pageid を取得済みかつ entityIds, stylesheets が未設定であれば Revision とスタイルシートのパスを取得する
      dispatch(WikiActions.fetchStylesheet(title as string));
      dispatch(WikiActions.fetchRevisions(pageid));
    }

    return () => {
      console.log('%c[WikiPage] useEffect clean', 'color: green');
    };
  }, [currentTitle, dispatch, entityIds, stylesheets, pageid, title, titles]);

  // Revision が未取得、スタイルシートが未取得、前回の開いた wiki/[titles] とタイトルが異なる、の
  // いづれかであればローディング画面を表示する
  if (entityIds.isEmpty() || stylesheets.isEmpty() || currentTitle !== titles) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Wiki entityIds={entityIds} />
      {/* <a
        href={`https://ja.wikipedia.org/w/index.php?curid=${pageid}`}
        rel="noreferrer noopener"
        target="_blank"
      >
        PageID: {pageid}
        <br />
        Revisions: {entityIds.size}
      </a> */}
    </>
  );
};

export default WikiPage;
