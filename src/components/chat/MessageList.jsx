import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { messagesSelectors } from '../../slices/messagesSlice.js';
import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';
import MessageListHeader from './MessageListHeader.jsx';

function MessageList() {
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const messages = useSelector(messagesSelectors.selectAll);
  const messagesAnchorRef = useRef(null);

  useEffect(() => {
    messagesAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannelId]);

  return (
    <Col className="h-100 p-0" xs={8} md={10}>
      <div className="d-flex flex-column h-100">
        <MessageListHeader />

        <div className="chat-messages overflow-auto px-5 ">
          {messages
            .filter((message) => message.channel === activeChannelId)
            .map((message) => (
              <Message key={message.id} message={message} />
            ))}
          <div ref={messagesAnchorRef} />
        </div>

        <MessageForm />
      </div>
    </Col>
  );
}

export default MessageList;
