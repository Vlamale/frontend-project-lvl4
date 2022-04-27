import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import _ from 'lodash'
import { removeChannel } from './channelsSlice.js'
import { fetchAllChatData } from './thunks.js'

const messagesAdapter = createEntityAdapter()

const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState(),
    reducers: {
        addMessage: messagesAdapter.addOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllChatData.fulfilled, (state, action) => {
                messagesAdapter.setAll(state, action.payload.messages)
            })
            .addCase(removeChannel, (state, action) => {
                const filteredMessages = Object.values(state.entities)
                    .filter(msg => msg.channel !== action.payload)
                
                messagesAdapter.setAll(state, filteredMessages)
            })
    }
})

export const {
    addMessage
} = messagesSlice.actions
export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)
export default messagesSlice.reducer