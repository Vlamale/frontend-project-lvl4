import React, {
  useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import { notifySuccess } from '../../notify.js';
import useSocketContext from '../../hooks/useSocketContext.js';

const addChannelSchema = object({
  name: string().required('formErrors.required'),
});

function AddChannelModal({ hideModalHandler }) {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const { socket } = useSocketContext();
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addChannelSchema,
    onSubmit: (values, { setFieldError }) => {
      setIsSending(true);
      const checkExistingName = channels.find((ch) => ch.name === values.name);

      if (checkExistingName) {
        setFieldError('name', t('formErrors.mustBeUnique'));
        return;
      }

      const channelData = {
        name: values.name,
      };
      socket.emit('newChannel', channelData, () => {
        setIsSending(false);
        hideModalHandler();
        notifySuccess(t('notify.success.addChannel'));
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
        <Form.Label className="visually-hidden">{t('modals.addChannel.channelName')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {t(formik.errors.name)}
        </Form.Control.Feedback>
      </Form.Group>

      <Modal.Footer className="border-0">
        <Button
          variant="secondary"
          onClick={hideModalHandler}
        >
          {t('modals.addChannel.cancleBtn')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSending}
        >
          {t('modals.addChannel.submitBtn')}
        </Button>
      </Modal.Footer>
    </Form>
  );
}

export default AddChannelModal;
