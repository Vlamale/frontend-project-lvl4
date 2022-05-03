import { useFormik } from 'formik';
import React, {
  useState, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import useSocketContext from '../../hooks/useSocketContext.js';

function MessageForm() {
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const [isSending, setIsSending] = useState(false);
  const { socket } = useSocketContext();
  const inputRef = useRef(null);

  useEffect(() => {
    filter.add(filter.getDictionary('ru'));
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannelId]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      setIsSending(true);
      const userName = JSON.parse(localStorage.getItem('user-data')).username;
      const messageData = {
        messageText: filter.clean(values.message),
        author: userName,
        channel: activeChannelId,
      };

      socket.emit('newMessage', messageData, () => {
        resetForm();
      });
      setIsSending(false);
      inputRef.current.focus();
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <div className="input-group has-validation">
          <Form.Control
            className="border-0 p-0 ps-2 form-control"
            type="text"
            name="message"
            placeholder={t('messages.inputPlaceholder')}
            aria-label={t('messages.inputLabel')}
            value={formik.values.message}
            ref={inputRef}
            onChange={formik.handleChange}
          />
          <button
            className="btn"
            type="submit"
            disabled={formik.values.message.trim() === '' || isSending}
          >
            {t('messages.sendBtn')}
            <span className="visually-hidden">{t('messages.sendBtnName')}</span>
          </button>
        </div>
      </Form>
    </div>
  );
}

export default MessageForm;
