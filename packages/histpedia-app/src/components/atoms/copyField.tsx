import styled from '@emotion/styled';
import React, { MutableRefObject, useRef } from 'react';
import useClipboard from 'react-use-clipboard';
import classNames from 'classnames';

/* types */
type ContainerProps = {
  classes?: string;
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value?: string;
};

type Props = {
  className?: string;
  inputEl: MutableRefObject<HTMLInputElement | null>;
  isCopied: boolean;
} & ContainerProps;

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  classes,
  className,
  inputEl,
  isCopied,
  name,
  onClick,
  value,
}: Props) => {
  return (
    <div className={classNames(className, classes)}>
      <div className="cp-Field">
        <input
          className="cp-Input"
          name={name}
          readOnly
          ref={inputEl}
          type="text"
          value={value}
        />
        <button className="cp-Button" type="button" onClick={onClick}>
          <span className="cp-Label">Copy to clipboard</span>
          <svg
            className="cp-Icon"
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
          >
            <path d="M33.5,15.12V34.38A2.63,2.63,0,0,1,30.88,37H15.12a2.63,2.63,0,0,1-2.62-2.62V15.12a2.63,2.63,0,0,1,2.62-2.62H19.5a3.5,3.5,0,0,1,7,0h4.38A2.63,2.63,0,0,1,33.5,15.12Zm-2.62.33a.33.33,0,0,0-.33-.33h-2.3v2a.65.65,0,0,1-.66.66H18.41a.66.66,0,0,1-.66-.66v-2h-2.3a.33.33,0,0,0-.33.33v18.6a.33.33,0,0,0,.33.33h15.1a.33.33,0,0,0,.33-.33ZM21.69,12.5A1.31,1.31,0,1,0,23,11.19,1.3,1.3,0,0,0,21.69,12.5Z" />
          </svg>
        </button>
      </div>
      {isCopied && (
        <div className={classNames('cp-Helper')}>Link copied to clipboard</div>
      )}
    </div>
  );
};

// Style ------------------------------------------
const StyledComponent = styled(Component)`
  font-family: 'Roboto Condensed', sans-serif;
  position: relative;

  .cp-Field {
    display: flex;
    font-size: 14px;
    font-size: 1.4rem;
    letter-spacing: 0.02em;
    line-height: 1.6;
    position: relative;
    z-index: 0;
  }

  .cp-Input {
    display: block;
    border-color: #000;
    border-width: 1px 0 1px 1px;
    border-style: solid;
    flex-grow: 1;
    flex-basis: 100%;
    padding: 0.8em 1.2em;

    &:focus {
      background-color: #fff;
      box-shadow: inset 0 0 0 1px #000;
      outline: 0;
    }
  }

  .cp-Button {
    display: block;
    border: solid 1px #000;
    flex-shrink: 0;
    flex-basis: 46px;
    position: relative;
    transition: background-color 0.25s ease, color 0.25s ease,
      border-color 0.25s ease, box-shadow 0.25s ease;

    &::before {
      content: '';
      display: block;
      width: 100%;
      padding: 100% 0 0;
      position: relative;
    }

    &:focus {
      box-shadow: inset 0 0 0 1px #000, inset 0 0 0 2px #fff;
      outline: 0;
    }

    &:hover {
      color: #fff;
      background-color: #000;
    }
  }

  .cp-Label {
    border: 0;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  .cp-Icon {
    max-width: 100%;
    width: 100%;
    max-height: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @keyframes cp-fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .cp-Helper {
    border: solid 1px #000;
    background: #fff;
    font-size: 12px;
    font-size: 1.2rem;
    letter-spacing: 0.02em;
    line-height: 1.6;
    padding: 0 0.6em;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: cp-fade-out 0.5s ease 0.5s forwards;
  }
`;

// Container ------------------------------------------
const CopyField: React.FC<ContainerProps> = ({
  classes,
  name,
  value = '',
}: ContainerProps) => {
  // console.log('[CopyField] render');

  const inputEl = useRef<HTMLInputElement | null>(null);
  const [isCopied, setCopied] = useClipboard(value, {
    successDuration: 1000,
  });

  const onClick = () => {
    setCopied();
    inputEl.current?.focus();
    inputEl.current?.select();
  };

  return (
    <StyledComponent
      classes={classes}
      inputEl={inputEl}
      isCopied={isCopied}
      name={name}
      onClick={onClick}
      value={value}
    />
  );
};

export default CopyField;
