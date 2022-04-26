import React from 'react'

const Message = ({message: {messageText, author}}) => {
    return (
        <div className="chat-messages overflow-auto px-5 ">
            <div className="text-break mb-2">
                <b>{author}</b>: {messageText}
            </div>
        </div>
    )
}

export default Message