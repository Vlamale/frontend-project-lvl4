import { useFormik } from 'formik';
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import SocketContext from '../../context/socket/SocketContext.js';

function MessageForm() {
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const [isSending, setIsSending] = useState(false);
  const { socket } = useContext(SocketContext);
  const inputRef = useRef(null);
  const { t } = useTranslation();

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
      console.log('sending', values.message);
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
            ref={inputRef}
            className="border-0 p-0 ps-2 form-control"
            aria-label={t('messages.inputLabel')}
            type="text"
            name="message"
            placeholder={t('messages.inputPlaceholder')}
            onChange={formik.handleChange}
            value={formik.values.message}
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
