import React from 'react'
import { Form } from 'react-bootstrap'

const MessageForm = () => {
    return (
        <div className="mt-auto px-5 py-3">
            <Form className="py-1 border rounded-2">
                <div className="input-group has-validation">
                    <Form.Control
                        required
                        className="border-0 p-0 ps-2 form-control"
                        type="text"
                        name="userName"
                        placeholder='Введите сообщение...'
                    // onChange={}
                    // value={}
                    // isInvalid={}
                    />
                    <button className="btn" type="submit" disabled>Send</button>
                </div>
            </Form>
        </div>
    )
}

export default MessageForm