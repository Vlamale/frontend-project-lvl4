import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../slices/modalSlice.js';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const ModalMapping = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

function ModalWindow() {
  const { type, isOpened } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!isOpened) return null;

  const ModalBody = ModalMapping[type];
  const hideModalHandler = () => {
    dispatch(hideModal());
  };

  return (
    <Modal centered show onHide={hideModalHandler}>
      <Modal.Header closeButton className="mb-4">
        <Modal.Title>{t(`modals.${type}.title`)}</Modal.Title>
      </Modal.Header>

      <ModalBody hideModalHandler={hideModalHandler} />
    </Modal>
  );
}

export default ModalWindow;
