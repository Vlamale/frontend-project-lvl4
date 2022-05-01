import React from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ChannelBtn from './ChannelBtn.jsx';
import { openModal } from '../../slices/modalSlice.js';

function RemovableChannelBtn({ channelData: { name, isActiveChannel, id } }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <ChannelBtn channelData={{ name, isActiveChannel, id }} />

      <Dropdown.Toggle
        split
        variant={isActiveChannel ? 'secondary' : 'light'}
      >

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => dispatch(openModal({ type: 'removeChannel', extra: { id } }))}
          >
            {t('channels.remove')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => {
            const extra = {
              id,
              name,
            };
            dispatch(openModal({ type: 'renameChannel', extra }));
          }}
          >
            {t('channels.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
        <span className="visually-hidden">{t('channels.channelControl')}</span>
      </Dropdown.Toggle>
    </Dropdown>
  );
}

export default RemovableChannelBtn;
