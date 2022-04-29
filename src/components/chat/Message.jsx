import React from 'react';

function Message({ message: { messageText, author } }) {
  return (
    <div className="text-break mb-2">
      <b>{author}</b>
      {': '}
      {messageText}
    </div>
  );
}

export default Message;
