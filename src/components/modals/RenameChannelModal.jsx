import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../slices/modalSlice.js';
import SocketContext from '../../context/socket/SocketContext.js';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import { notifySuccess } from '../../notify.js';

function RenameChannelModal() {
  const channelData = useSelector((state) => state.modal.extra);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const { socket } = useContext(SocketContext);
  const inputRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  const hideModalHandler = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: {
      name: channelData.name,
    },
    onSubmit: (values, { setFieldError }) => {
      setIsSending(true);
      const checkSameName = channels.find((ch) => ch.name === values.name);

      if (checkSameName) {
        setFieldError('name', t('formErrors.mustBeUnique'));
        return;
      }

      const channelRequestData = {
        name: values.name,
        id: channelData.id,
      };
      socket.emit('renameChannel', channelRequestData, () => {
        setIsSending(false);
        hideModalHandler();
        notifySuccess(t('notify.success.renameChannel'));
      });
    },
  });

  return (
    <Modal centered show onHide={hideModalHandler}>
      <Modal.Header className="mb-4" closeButton>
        <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
      </Modal.Header>

      <Form className="py-1 border-0 rounded-2 p-3" onSubmit={formik.handleSubmit}>
        <Form.Control
          ref={inputRef}
          required
          className="p-2 ps-2 form-control mb-2"
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={!!formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>

        <Modal.Footer className="border-0">
          <Button
            variant="secondary"
            onClick={hideModalHandler}
          >
            {t('modals.renameChannel.cancleBtn')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSending}
          >
            {t('modals.renameChannel.submitBtn')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RenameChannelModal;
