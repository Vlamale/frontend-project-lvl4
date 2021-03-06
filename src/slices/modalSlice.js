import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, action) => ({
      isOpened: true,
      type: action.payload.type,
      extra: action.payload.extra,
    }),
    hideModal: () => ({
      isOpened: false,
      type: null,
      extra: null,
    }),
  },
});

export const { openModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
