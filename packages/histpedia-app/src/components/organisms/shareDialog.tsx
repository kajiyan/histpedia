import { css, Global, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
import Modal from 'react-modal';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { List } from 'immutable';
import WikiActions from '../../actions/Wiki';
import CloseIcon from '../atoms/icon/closeIcon';
import Checkbox from '../atoms/checkbox';
import CopyField from '../atoms/copyField';
import IconButton from '../atoms/iconButton';
import { StoreState } from '../../store/index';

/* types */
type ContainerProps = {
  entityIds: List<string>;
};

type Props = {
  className?: string;
  defaultCheckedList: {
    [key: string]: boolean;
  };
  modalStyle: SerializedStyles;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  open: boolean;
  progress: string;
  timestamp?: string;
  title: string;
  url: string;
};

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#__next');

// DOM ------------------------------------------
const Component: React.FC<Props> = ({
  className,
  defaultCheckedList,
  modalStyle,
  onChange,
  onClose,
  open,
  progress,
  timestamp,
  title,
  url,
}: Props) => {
  return (
    <div className={className}>
      <Global styles={modalStyle} />
      <Modal
        bodyOpenClassName="sd-Modal_Body-open"
        className="sd-Modal_Content"
        closeTimeoutMS={250}
        htmlOpenClassName="sd-Modal_HTML-open"
        isOpen={open}
        onRequestClose={onClose}
        overlayClassName={{
          base: 'sd-Modal',
          afterOpen: 'sd-Modal-after-open',
          beforeClose: 'sd-Modal-before-close',
        }}
      >
        <div className="sd-Content">
          <div className="sd-Content_Inner">
            <div className="sd-Heading">Share</div>
            <ul className="sd-Share_List">
              <li className="sd-Share_Item">
                <TwitterShareButton title={title} url={url}>
                  <TwitterIcon size={44} round />
                </TwitterShareButton>
              </li>
              <li className="sd-Share_Item">
                <FacebookShareButton quote={title} url={url}>
                  <FacebookIcon size={44} round />
                </FacebookShareButton>
              </li>
            </ul>

            <div className="sd-Fieldset">
              <CopyField classes="sd-CopyField" name="url" value={url} />

              <div className="sd-Field">
                <Checkbox
                  defaultChecked={defaultCheckedList.sdStart}
                  id="sdStart"
                  onChange={onChange}
                >
                  <span className="sd-Checkbox_Phrase">
                    Start at {progress}&ensp;
                  </span>
                  {timestamp && (
                    <span className="sd-Checkbox_Phrase">
                      (Revision as of {timestamp})
                    </span>
                  )}
                </Checkbox>
              </div>
              <div className="sd-Field">
                <Checkbox
                  defaultChecked={defaultCheckedList.sdDiff}
                  id="sdDiff"
                  onChange={onChange}
                >
                  <span className="sd-Checkbox_Phrase">Show difference</span>
                </Checkbox>
              </div>
            </div>

            <IconButton
              classes="sd-Button-close"
              label="close"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Style ------------------------------------------
const modalStyle = css`
  .sd-Modal {
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3000;
    -webkit-tap-highlight-color: transparent;
    opacity: 0;
    transition: opacity 250ms ease-in-out;

    .sd-Button-close {
      width: 28px;
      margin: ${(20 / (632 - 72 * 2)) * 100}%;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .sd-Modal-after-open {
    opacity: 1;
  }

  .sd-Modal-before-close {
    opacity: 0;
  }

  .sd-Modal_Content {
    width: 100%;
    position: absolute;
    top: 50%;
    outline: none;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateY(-50%);
  }

  .sd-Content {
    max-width: 632px;
    padding: 0 ${(72 / 1280) * 100}%;
    margin: 0 auto;
  }

  .sd-Content_Inner {
    background-color: #fff;
    padding: ${(28 / (632 - 72 * 2)) * 100}%;
    position: relative;
  }

  .sd-Heading {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 16px;
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.02em;
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .sd-Share_List {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0 0 28px;
  }

  .sd-Share_Item {
    padding: 0 6px;
  }

  .sd-CopyField {
    margin: 0 0 16px;
  }

  .sd-Checkbox_Phrase {
    display: inline-block;
  }
`;

const StyledComponent = styled(Component)``;

// Container ------------------------------------------
const ShareDialog: React.FC<ContainerProps> = ({
  entityIds,
}: ContainerProps) => {
  // console.log('[ShareDialog] render');

  const dispatch = useDispatch();
  const { currentTitle, progress, open, start, timestamp } = useSelector(
    (state: StoreState) => {
      const { entities, histories } = state.wiki;
      const entityId = entityIds.get(histories.viewEntityIdIndex);
      const to = `${entityIds.size - 1}`;
      const from = `${histories.viewEntityIdIndex}`.padStart(to.length, '0');
      const temp = {
        currentTitle: histories.currentTitle,
        progress: `${from}/${to}`,
        open: histories.shareDialogOpen,
        start: histories.viewEntityIdIndex,
      };

      if (entityId) {
        return {
          ...temp,
          timestamp: entities.history.get(entityId)?.formattedTimestamp(),
        };
      }

      return {
        ...temp,
        timestamp: undefined,
      };
    },
    shallowEqual
  );
  const [checkedList, updateChecked] = useState({
    sdDiff: false,
    sdStart: false,
  });

  let url = `https://histpedia.org/wiki/${encodeURIComponent(
    currentTitle as string
  )}`;

  if (checkedList.sdDiff || checkedList.sdStart) {
    url += '?';
    url += checkedList.sdDiff ? 'diff=1' : '';
    url += checkedList.sdStart ? `&start=${start}` : '';
  } else {
    url += '/';
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = event.target;

    updateChecked({ ...checkedList, [id]: checked });
  };

  const onClose = () => {
    dispatch(WikiActions.updateShareDialogOpen(false));
  };

  return (
    <StyledComponent
      defaultCheckedList={checkedList}
      open={open}
      modalStyle={modalStyle}
      onChange={onChange}
      onClose={onClose}
      progress={progress}
      timestamp={timestamp}
      title={`${currentTitle} - Histpedia`}
      url={url}
    />
  );
};

export default ShareDialog;
