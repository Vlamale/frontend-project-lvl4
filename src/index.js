// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
import './locales/i18n.js';
import { io } from 'socket.io-client';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const run = async () => {
  const socket = io();
  const app = await init(socket);
  ReactDOM.render(app, document.getElementById('chat'));
};

run();
