import { useFormik } from 'formik'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import SocketContext from '../../context/socket/SocketContext.js'

const MessageForm = () => {
    const activeChannelId = useSelector(state => state.channels.activeChannelId)
    const [isSending, setIsSending] = useState(false)
    const { socket } = useContext(SocketContext)
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values, { resetForm }) => {
            setIsSending(true)
            const userName = JSON.parse(localStorage.getItem('user-data')).username
            const messageData = {
                messageText: values.message,
                author: userName,
                channel: activeChannelId
            }

            socket.emit('newMessage', messageData, () => {
                resetForm()
            })
            setIsSending(false)
            inputRef.current.focus()
        }
    })

    return (
        <div className="mt-auto px-5 py-3">
            <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                <div className="input-group has-validation">
                    <Form.Control
                        required
                        ref={inputRef}
                        className="border-0 p-0 ps-2 form-control"
                        type="text"
                        name="message"
                        placeholder='Введите сообщение...'
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    />
                    <button
                        className="btn"
                        type="submit"
                        disabled={formik.values.message.trim().length === 0 || isSending}
                    >
                        Send
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default MessageForm