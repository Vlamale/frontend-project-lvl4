import React from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import { messagesSelectors } from '../../slices/messagesSlice.js'
import Message from './Message.jsx'
import MessageForm from './MessageForm.jsx'
import MessageListHeader from './MessageListHeader.jsx'

const MessageList = () => {
    const activeChannelId = useSelector(state => state.channels.activeChannelId)
    const messages = useSelector(messagesSelectors.selectAll)

    return (
        <Col className="h-100 p-0" xs={8}>
            <div className="d-flex flex-column h-100">
                <MessageListHeader />

                {messages.filter((message) => message.channel === activeChannelId)
                    .map((message) => (
                        <Message key={message.id} message={message} />
                    ))}

                <MessageForm />
            </div>
        </Col>
    )
}

export default MessageList