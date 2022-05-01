import React from 'react';
import cn from 'classnames';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../../slices/channelsSlice.js';

function ChannelBtn({ channelData: { name, isActiveChannel, id } }) {
  const dispatch = useDispatch();

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

export default ChannelBtn;
