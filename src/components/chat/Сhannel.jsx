import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalSlice.js';

function Channel({ data: { name, removable, id }, activeChannelId }) {
  const dispatch = useDispatch();
  const isActiveChannel = activeChannelId === id;
  const { t } = useTranslation();

  const buttonStyles = cn(
    'font-weight-bold',
    'text-secondary',
    'w-100',
    'text-start',
    'text-truncate',
    {
      'text-light': isActiveChannel,
      'text-dark': !isActiveChannel,
    },
  );

  const handleSelectChannel = () => {
    dispatch(setActiveChannel(id));
  };

  if (!removable) {
    return (
      <Button
        variant={isActiveChannel ? 'secondary' : 'light'}
        className={buttonStyles}
        onClick={handleSelectChannel}
      >
        #&nbsp;
        {' '}
        {name}
      </Button>
    );
  }

  return (
    <Dropdown as={ButtonGroup} className="w-100">

      <Button
        variant={isActiveChannel ? 'secondary' : 'light'}
        className={buttonStyles}
        onClick={handleSelectChannel}
      >
        #&nbsp;
        {' '}
        {name}
      </Button>

      <Dropdown.Toggle
        split
        variant={isActiveChannel ? 'secondary' : 'light'}
      />

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
    </Dropdown>
  );
}

export default Channel;
