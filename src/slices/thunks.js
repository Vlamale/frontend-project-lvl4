import { createAsyncThunk } from '@reduxjs/toolkit';
import { authHost } from '../http/index.js';

/* eslint-disable import/prefer-default-export */
export const fetchAllChatData = createAsyncThunk(
  'channels',
  async () => {
    const { data } = await authHost.get('data');
    return data;
  },
);
