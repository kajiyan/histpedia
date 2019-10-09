import { NextPageContext } from 'next';
import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import Layout from '../components/Layout';
import { User } from '../interfaces';
import { findData } from '../utils/sample-api';
import ListDetail from '../components/ListDetail';

type Props = {
  item?: User;
  errors?: string;
};

class InitialPropsDetail extends React.Component<Props> {
  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query;
      const item = await findData(Array.isArray(id) ? id[0] : id);
      return { item };
    } catch (err) {
      return { errors: err.message };
    }
  };

  render() {
    const { item, errors } = this.props;

    if (errors) {
      return (
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      );
    }

    return (
      <React.Fragment>
        <Layout
          title={`${
            item ? item.name : 'Detail'
          } | Next.js + TypeScript Example`}
        >
          {item && <ListDetail item={item} />}
        </Layout>
        <TransitionMotion
          styles={[
            {
              key: 'test',
              style: {
                opacity: spring(1),
                scale: spring(1)
              }
            }
          ]}
          willEnter={() => ({
            opacity: 0,
            scale: 0.98
          })}
          willLeave={() => ({
            opacity: spring(0),
            scale: spring(1.02)
          })}
        >
          {interpolatedStyles => (
            <>
              {/* {interpolatedStyles.map(config => {
              {
                this.props.route === '/about' && (
                  <div key={config.key} style={{ ...config.style }}>
                    aaa
                  </div>
                );
              }
            })} */}
              {interpolatedStyles.map(config => (
                <div key={config.key} style={{ ...config.style }}>
                  testtesttesttesttesttesttesttest
                </div>
              ))}
            </>
          )}
        </TransitionMotion>
      </React.Fragment>
    );
  }
}

export default InitialPropsDetail;
