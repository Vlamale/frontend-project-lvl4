import React from 'react';
import ChannelBtn from './ChannelBtn.jsx';
import RemovableChannelBtn from './RemovableChannelBtn.jsx';

function Channel({ data: { name, removable, id }, activeChannelId }) {
  const isActiveChannel = activeChannelId === id;

  const channelData = { name, isActiveChannel, id };

  return removable
    ? <RemovableChannelBtn channelData={channelData} />
    : <ChannelBtn channelData={channelData} />;
}

export default Channel;
