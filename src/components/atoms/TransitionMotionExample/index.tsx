import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';

type Props = {
  route: string;
};

class TransitionMotionExample extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log(this.props.route);

    return (
      <TransitionMotion
        styles={[
          {
            key: this.props.route,
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
                {this.props.route}
              </div>
            ))}
          </>
        )}
      </TransitionMotion>
    );
  }
}

export default TransitionMotionExample;
