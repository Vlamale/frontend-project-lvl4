import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'
import { fetchAllChatData } from './thunks.js'

const messagesAdapter = createEntityAdapter()

const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllChatData.fulfilled, (state, action) => {
            messagesAdapter.setAll(state, action.payload.messages)
        })
    }
})

export const {} = messagesSlice.actions
export default messagesSlice.reducer