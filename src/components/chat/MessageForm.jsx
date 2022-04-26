import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import SocketContext from '../../context/socket/SocketContext.js'

const MessageForm = () => {
    const activeChannelId = useSelector(state => state.channels.activeChannelId)
    const { socket } = useContext(SocketContext)

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values, { resetForm }) => {
            const userName = JSON.parse(localStorage.getItem('user-data')).username
            const messageData = {
                messageText: values.message,
                author: userName,
                channel: activeChannelId
            }

            socket.emit('newMessage', messageData, (response) => {
                console.log(response.status)
            })
            resetForm()
        }
    })

    return (
        <div className="mt-auto px-5 py-3">
            <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                <div className="input-group has-validation">
                    <Form.Control
                        required
                        className="border-0 p-0 ps-2 form-control"
                        type="text"
                        name="message"
                        placeholder='Введите сообщение...'
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    />
                    <button className="btn" type="submit" >Send</button>
                </div>
            </Form>
        </div>
    )
}

export default MessageForm