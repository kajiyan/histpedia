import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import WikiActions from '../../../src/actions/Wiki';
import { StoreState } from '../../../src/store';

const WikiPage = (): JSX.Element => {
  console.log('WikiPage');
  const dispatch = useDispatch();
  const wikiState = useSelector((state: StoreState) => state.wiki);
  const { pageid, initialized } = wikiState.histories;
  const router = useRouter();
  // URL エンコードする必要がある
  const { titles } = router.query;

  useEffect(() => {
    console.log('useEffect', pageid, initialized);
    // Todo: 初期化が完了していなければURLに指定されたタイトルのIDを取得する
    if (!initialized) {
      dispatch(WikiActions.fetchPageId(titles as string));
    }

    if (!(typeof pageid === 'undefined') && pageid > -1) {
      // Todo: Todo: リビジョンの取得
    } else {
      // Todo: 該当記事が見つからなかった時の処理
    }

    return () => {
      if (initialized && !(typeof pageid === 'undefined')) {
        // Todo: ステートの初期化をする
        console.log('useEffect clean', pageid, initialized);
      }
    };
  }, [initialized, pageid, dispatch, titles]);

  // string 型へのキャスト
  // title が undefined の場合 404 ページが表示されるので undefined の可能性はない
  // これを再レンダリングされるときに呼ばれないようにする
  // dispatch(WikiActions.fetchPageId(titles as string));

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
        {titles} {pageid}
      </a>
    </>
  );
};

export default WikiPage;
