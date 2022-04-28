import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import { io } from 'socket.io-client';
import SocketContext from './SocketContext.js';
import { addMessage } from '../../slices/messagesSlice.js';
import {
  addChannel, removeChannel, renameChannel, setActiveChannel, setDefaultChannelAsActive,
} from '../../slices/channelsSlice.js';

function SocketProvider({ children }) {
  /* eslint-disable no-shadow */
  const socket = useRef(null);
  const dispatch = useDispatch();
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    socket.current = io();

    socket.current.on('connect', () => {
      socket.current.on('newMessage', (socket) => {
        dispatch(addMessage(socket));
      });

      socket.current.on('newChannel', (socket) => {
        dispatch(addChannel(socket));
        dispatch(setActiveChannel(socket.id));
      });

      socket.current.on('removeChannel', (socket) => {
        batch(() => {
          dispatch(removeChannel(socket.id));
          dispatch(setDefaultChannelAsActive());
        });
      });

      socket.current.on('renameChannel', (socket) => {
        const updateData = {
          id: socket.id,
          changes: {
            name: socket.name,
          },
        };
        dispatch(renameChannel(updateData));
      });

      setConnection(true);
    });
  }, []);

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket: socket.current, connection }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
