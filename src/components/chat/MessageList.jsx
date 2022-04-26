import React from 'react'
import { Col } from 'react-bootstrap'
import Message from './Message.jsx'
import MessageForm from './MessageForm.jsx'
import MessageListHeader from './MessageListHeader.jsx'

const MessageList = () => {
    return (
        <Col className="h-100 p-0" xs={8}>
            <div className="d-flex flex-column h-100">
                <MessageListHeader />

                <Message />

                <MessageForm />
            </div>
        </Col>
    )
}

export default MessageList