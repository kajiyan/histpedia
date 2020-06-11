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
  const entities = wikiState.entities.history;
  const router = useRouter();
  // URL エンコードする必要がある
  const { titles } = router.query;

  useEffect(() => {
    if (initialized) {
      if (typeof pageid !== 'undefined') {
        if (entityIds.isEmpty()) {
          // pageid を取得済みかつ entityIds が未設定であれば Revision を取得する
          dispatch(WikiActions.fetchRevisions(pageid));
        } else if (entityIds.has(0)) {
          // pageid を取得済みかつ entityIds が設定済みであれば Context を取得する
          // entityIds.has(0) で undefined でないことを保証している
          const entityId = entityIds.get(0) as string;
          const entity = entities.get(entityId);

          if (typeof entity?.revid !== 'undefined') {
            dispatch(WikiActions.fetchContent(entity.revid));
          }
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
        console.log('useEffect clean', pageid, initialized);
      }
    };
  }, [dispatch, entities, entityIds, initialized, pageid, titles]);

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
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={(() => {
          if (entityIds.has(0)) {
            return {
              __html: entities.get(entityIds.get(0) as string)?.text as string,
            };
          }
          return {
            __html: '',
          };
        })()}
      />
    </>
  );
};

export default WikiPage;
