import React, { useContext, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../slices/modalSlice.js'
import SocketContext from '../../context/socket/SocketContext.js'
import { useTranslation } from 'react-i18next'

const RemoveChannelModal = () => {
    const dispatch = useDispatch()
    const { socket } = useContext(SocketContext)
    const channelId = useSelector(state => state.modal.extra.id)
    const [isSending, setIsSending] = useState(false)
    const { t } = useTranslation()

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
                <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="pb-0 pt-0 lead">
                {t('modals.removeChannel.bodyText')}
            </Modal.Body>

            <Form className="py-1 border-0 rounded-2 p-3" onSubmit={removeChannel}>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={hideModalHandler}>{t('modals.removeChannel.cancleBtn')}</Button>
                    <Button type="submit" variant="danger" disabled={isSending}>{t('modals.removeChannel.submitBtn')}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default RemoveChannelModal