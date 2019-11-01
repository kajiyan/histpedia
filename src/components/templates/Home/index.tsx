import { Props } from '../../../containers/templates/Home';

const defaultProps = {};

const Home = (props: Props) => {
  return (
    <div>
      <h1>Count: {props.count}</h1>
      <div>
        <button onClick={props.asyncIncrement}>asyncIncrement</button>
      </div>
      <div>
        <button onClick={props.increment}>increment</button>
      </div>
      <div>
        <button onClick={props.decrement}>decrement</button>
      </div>
    </div>
  );
};

Home.defaultProps = defaultProps;

export default Home;
