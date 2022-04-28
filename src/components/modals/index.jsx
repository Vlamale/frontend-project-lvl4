import React from 'react';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const modalMapping = {
  addChannel: <AddChannelModal />,
  removeChannel: <RemoveChannelModal />,
  renameChannel: <RenameChannelModal />,
};

export default (type) => modalMapping[type];
