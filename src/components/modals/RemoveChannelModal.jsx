import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { notifySuccess } from '../../notify.js';
import useSocketContext from '../../hooks/useSocketContext.js';

function RemoveChannelModal({ hideModalHandler }) {
  const { t } = useTranslation();
  const { socket } = useSocketContext();
  const channelId = useSelector((state) => state.modal.extra.id);
  const [isSending, setIsSending] = useState(false);

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
