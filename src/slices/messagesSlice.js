import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'
import { fetchAllChatData } from './thunks.js'

const messagesAdapter = createEntityAdapter()

const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState(),
    reducers: {
        addMessage: messagesAdapter.addOne
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllChatData.fulfilled, (state, action) => {
            messagesAdapter.setAll(state, action.payload.messages)
        })
    }
})

export const {
    addMessage
} = messagesSlice.actions
export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)
export default messagesSlice.reducer