import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import SocketContext from '../../context/socket/SocketContext.js';
import { notifySuccess } from '../../notify.js';

function RemoveChannelModal() {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const channelId = useSelector((state) => state.modal.extra.id);
  const [isSending, setIsSending] = useState(false);
  const { t } = useTranslation();

  const hideModalHandler = () => {
    dispatch(hideModal());
  };

  const removeChannel = () => {
    setIsSending(true);
    socket.emit('removeChannel', { id: channelId }, () => {
      setIsSending(false);
      hideModalHandler();
      notifySuccess(t('notify.success.removeChannel'));
    });
  };

  return (
    <Modal centered show onHide={hideModalHandler}>
      <Modal.Header className="mb-4" closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pb-0 pt-0 lead">
        {t('modals.removeChannel.bodyText')}
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button
          variant="secondary"
          onClick={hideModalHandler}
        >
          {t('modals.removeChannel.cancleBtn')}
        </Button>
        <Button
          onClick={removeChannel}
          variant="danger"
          disabled={isSending}
        >
          {t('modals.removeChannel.submitBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveChannelModal;
