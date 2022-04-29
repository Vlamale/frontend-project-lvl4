import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const ModalMapping = {
  addChannel: <AddChannelModal />,
  removeChannel: <RemoveChannelModal />,
  renameChannel: <RenameChannelModal />,
};

function Modal() {
  const { type, isOpened } = useSelector((state) => state.modal);

  return isOpened && ModalMapping[type];
}

export default Modal;
