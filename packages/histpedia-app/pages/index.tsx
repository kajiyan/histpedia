import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import ExampleActions, { decrement, increment } from '../src/actions/Example';
import Layout from '../components/Layout';
import { StoreState } from '../src/store';

const IndexPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const exampleState = useSelector((state: StoreState) => state.example);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>
        Hello Next.js {exampleState.count}
        <span role="img" aria-label="Hello">
          👋
        </span>
      </h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <div>
        <button onClick={() => dispatch(increment())} type="button">
          increment
        </button>
        <button onClick={() => dispatch(decrement())} type="button">
          decrement
        </button>
        <button
          onClick={() => dispatch(ExampleActions.asyncIncrement())}
          type="button"
        >
          async increment
        </button>
      </div>
    </Layout>
  );
};

export default IndexPage;
