import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import ExampleActions, { decrement, increment } from '../src/actions/Example';
import Layout from '../components/Layout';
import Counter from '../components/counter';
import { StoreState } from '../src/store';

const IndexPage = (): JSX.Element => {
  console.log('IndexPage');
  const dispatch = useDispatch();
  const c = useSelector((state: StoreState) => state.example.c);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>
        Hello Next.js
        <span role="img" aria-label="Hello">
          👋
        </span>
      </h1>
      <div>{c}</div>
      <Counter />
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <div>
        <button onClick={() => dispatch(increment())} type="button">
          increment
        </button>
        <br />
        <button onClick={() => dispatch(decrement())} type="button">
          decrement
        </button>
        <br />
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
