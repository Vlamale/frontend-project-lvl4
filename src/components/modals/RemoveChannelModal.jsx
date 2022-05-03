import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../context/socket/SocketContext.js';
import { notifySuccess } from '../../notify.js';

function RemoveChannelModal({ hideModalHandler }) {
  const { socket } = useContext(SocketContext);
  const channelId = useSelector((state) => state.modal.extra.id);
  const [isSending, setIsSending] = useState(false);
  const { t } = useTranslation();

  const removeChannel = () => {
    setIsSending(true);
    socket.emit('removeChannel', { id: channelId }, () => {
      setIsSending(false);
      hideModalHandler();
      notifySuccess(t('notify.success.removeChannel'));
    });
  };

  return (
    <>
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
          variant="danger"
          disabled={isSending}
          onClick={removeChannel}
        >
          {t('modals.removeChannel.submitBtn')}
        </Button>
      </Modal.Footer>
    </>
  );
}

export default RemoveChannelModal;
