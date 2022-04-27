import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { openModal } from '../../slices/modalSlice.js'

const ChannelListHeader = () => {
    const dispatch = useDispatch()

    const openModalHandler = () => {
        dispatch(openModal({ type: 'addChannel', extra: null }))
    }

    return (
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span className="text-truncate">Каналы</span>
            <Button
                variant="outline-primary"
                size='sm'
                onClick={openModalHandler}
            >
                +
            </Button>
        </div>
    )
}

export default ChannelListHeader