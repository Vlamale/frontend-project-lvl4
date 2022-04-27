import React from 'react'
import {useSelector} from 'react-redux'
import { channelsSelectors } from '../../slices/channelsSlice.js'

const MessageListHeader = () => {
    const activeChannelId = useSelector(state => state.channels.activeChannelId)
    const activeChannel = useSelector(state => channelsSelectors.selectById(state, activeChannelId))

    return (
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
                <strong className="text-truncate d-block"># {activeChannel?.name}</strong>
            </p>
            <span className="text-muted">179 сообщений</span>
        </div>
    )
}

export default MessageListHeader