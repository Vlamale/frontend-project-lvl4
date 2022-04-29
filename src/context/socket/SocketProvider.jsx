import React, { useEffect, useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import SocketContext from './SocketContext.js';
import { addMessage } from '../../slices/messagesSlice.js';
import {
  addChannel, removeChannel, renameChannel, setActiveChannel, setDefaultChannelAsActive,
} from '../../slices/channelsSlice.js';

/* eslint-disable no-shadow */
function SocketProvider({ children, socket }) {
  const dispatch = useDispatch();
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    socket.on('newMessage', (socket) => {
      dispatch(addMessage(socket));
    });

    socket.on('newChannel', (socket) => {
      dispatch(addChannel(socket));
      dispatch(setActiveChannel(socket.id));
    });

    socket.on('removeChannel', (socket) => {
      batch(() => {
        dispatch(removeChannel(socket.id));
        dispatch(setDefaultChannelAsActive());
      });
    });

    socket.on('renameChannel', (socket) => {
      const updateData = {
        id: socket.id,
        changes: {
          name: socket.name,
        },
      };
      dispatch(renameChannel(updateData));
    });

    setConnection(true);
  }, []);

  return (
  /* eslint-disable-next-line react/jsx-no-constructed-context-values */
    <SocketContext.Provider value={{ socket, connection }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
