import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Modal } from 'react-bootstrap'
import { object, string } from 'yup'
import { hideModal } from '../../slices/modalSlice.js'
import { useFormik } from 'formik'
import SocketContext from '../../context/socket/SocketContext.js'
import { channelsSelectors } from '../../slices/channelsSlice.js'
import { useTranslation } from 'react-i18next'

const AddChannelModal = () => {
    const dispatch = useDispatch()
    const channels = useSelector(channelsSelectors.selectAll)
    const { socket } = useContext(SocketContext)
    const [isSending, setIsSending] = useState(false)
    const inputRef = useRef(null)
    const { t } = useTranslation()

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const hideModalHandler = () => {
        dispatch(hideModal())
    }

    const addChannelSchema = object({
        name: string().required(t('formErrors.required'))
    })

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: addChannelSchema,
        onSubmit: (values, { setFieldError }) => {
            setIsSending(true)
            const checkExistingName = channels.find(ch => ch.name === values.name)

            if (checkExistingName) {
                setFieldError('name', t('formErrors.mustBeUnique'))
                return
            }

            const channelData = {
                name: values.name
            }
            socket.emit('newChannel', channelData, () => {
                setIsSending(false)
                hideModalHandler()
            })
        }
    })

    return (
        <Modal centered show onHide={hideModalHandler}>
            <Modal.Header className="mb-4" closeButton>
                <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
            </Modal.Header>

            <Form className="py-1 border-0 rounded-2 p-3" onSubmit={formik.handleSubmit} >
                <Form.Control
                    ref={inputRef}
                    className="p-2 ps-2 form-control mb-2"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    isInvalid={!!formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                </Form.Control.Feedback>

                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={hideModalHandler}>{t('modals.addChannel.cancleBtn')}</Button>
                    <Button type="submit" variant="primary" disabled={isSending}>{t('modals.addChannel.submitBtn')}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddChannelModal