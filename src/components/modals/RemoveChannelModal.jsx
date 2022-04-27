import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../slices/modalSlice.js'
import SocketContext from '../../context/socket/SocketContext.js'

const RemoveChannelModal = () => {
    const dispatch = useDispatch()
    const { socket } = useContext(SocketContext)
    const channelId = useSelector(state => state.modal.extra.id)
    const [isSending, setIsSending] = useState(false)

    const hideModalHandler = () => {
        dispatch(hideModal())
    }

    const removeChannel = (e) => {
        e.preventDefault()
        setIsSending(true)
        socket.emit('removeChannel', { id: channelId }, () => {
            setIsSending(false)
            hideModalHandler()
        })
    }

    return (
        <Modal centered show onHide={hideModalHandler}>
            <Modal.Header className="mb-4" closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>

            <Modal.Body className="pb-0 pt-0 lead">
                Уверены?
            </Modal.Body>

            <Form className="py-1 border-0 rounded-2 p-3" onSubmit={removeChannel}>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={hideModalHandler}>Отменить</Button>
                    <Button type="submit" variant="danger" disabled={isSending}>Удалить</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default RemoveChannelModal