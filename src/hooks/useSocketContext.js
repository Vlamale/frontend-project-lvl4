import React from 'react';
import SocketContext from '../context/socket/SocketContext.js';

const useSocketContext = () => React.useContext(SocketContext);

export default useSocketContext;
