import React, {
  useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import { notifySuccess } from '../../notify.js';
import useSocketContext from '../../hooks/useSocketContext.js';

const renameChannelSchema = object({
  name: string().required('formErrors.required'),
});

function RenameChannelModal({ hideModalHandler }) {
  const { t } = useTranslation();
  const channelData = useSelector((state) => state.modal.extra);
  const channels = useSelector(channelsSelectors.selectAll);
  const { socket } = useSocketContext();
  const inputRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channelData.name,
    },
    validationSchema: renameChannelSchema,
    onSubmit: (values, { setFieldError }) => {
      const checkSameName = channels.find((ch) => ch.name === values.name);

      if (checkSameName) {
        setFieldError('name', t('formErrors.mustBeUnique'));
        return;
      }

      setIsSending(true);
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
    <Form className="py-1 border-0 rounded-2 p-3" onSubmit={formik.handleSubmit}>

      <Form.Group controlId="name">
        <Form.Control
          className="p-2 ps-2 form-control mb-2"
          type="text"
          name="name"
          ref={inputRef}
          value={formik.values.name}
          isInvalid={!!formik.errors.name}
          onChange={formik.handleChange}
        />
        <Form.Label className="visually-hidden">{t('modals.renameChannel.channelName')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.name)}
        </Form.Control.Feedback>
      </Form.Group>

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
  );
}

export default RenameChannelModal;
