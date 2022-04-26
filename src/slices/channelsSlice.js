import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'
import { fetchAllChatData } from './thunks.js'

const channelsAdapter = createEntityAdapter()

const channelsSlice = createSlice({
    name: 'channels',
    initialState: channelsAdapter.getInitialState({
        activeChannelId: 1
    }),
    reducers: {
        setActiveChannel: (state, action) => {state.activeChannelId = action.payload}
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllChatData.fulfilled, (state, action) => {
            channelsAdapter.setAll(state, action.payload.channels)
        })
    }
})

export const {
    setActiveChannel
} = channelsSlice.actions
export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export default channelsSlice.reducer