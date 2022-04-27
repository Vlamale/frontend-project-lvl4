import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { fetchAllChatData } from './thunks.js'

const channelsAdapter = createEntityAdapter()

const channelsSlice = createSlice({
    name: 'channels',
    initialState: channelsAdapter.getInitialState({
        activeChannelId: 1
    }),
    reducers: {
        setActiveChannel: (state, action) => { state.activeChannelId = action.payload },
        setDefaultChannelAsActive: (state) => {
            const defaultChannel = Object.values(state.entities)
                .find(ch => ch.removable === false)

            state.activeChannelId = defaultChannel.id
        },
        addChannel: channelsAdapter.addOne,
        removeChannel: channelsAdapter.removeOne,
        renameChannel: channelsAdapter.updateOne
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllChatData.fulfilled, (state, action) => {
            channelsAdapter.setAll(state, action.payload.channels)
        })
    }
})

export const {
    setActiveChannel,
    addChannel,
    removeChannel,
    renameChannel,
    setDefaultChannelAsActive
} = channelsSlice.actions
export const channelsSelectors = channelsAdapter.getSelectors(state => state.channels)
export default channelsSlice.reducer