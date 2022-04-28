import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row } from 'react-bootstrap';
import { fetchAllChatData } from '../slices/thunks.js';
import ChannelList from '../components/chat/СhannelList.jsx';
import MessageList from '../components/chat/MessageList.jsx';

function ChatPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      dispatch(fetchAllChatData());
    }());
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelList />

        <MessageList />
      </Row>
    </div>
  );
}

export default ChatPage;
