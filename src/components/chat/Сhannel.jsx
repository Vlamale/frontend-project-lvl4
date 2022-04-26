import React from 'react'
import { Button } from 'react-bootstrap'
import { ButtonGroup, Dropdown } from 'react-bootstrap'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { setActiveChannel } from '../../slices/channelsSlice.js'

const Channel = ({ data: { name, removable, id }, activeChannelId }) => {
    const dispatch = useDispatch()
    const isActiveChannel = activeChannelId === id

    const buttonStyles = cn('font-weight-bold', 'text-secondary', {
        'text-light': isActiveChannel,
        'text-dark': !isActiveChannel
    })

    const handleSelectChannel = () => {
        dispatch(setActiveChannel(id))
    }

    return (
        <Dropdown as={ButtonGroup}>

            <Button
                variant={isActiveChannel ? 'secondary' : 'light'}
                className={buttonStyles}
                onClick={() => handleSelectChannel()}
            >
                #&nbsp; {name}
            </Button>

            <Dropdown.Toggle
                split
                variant={isActiveChannel ? 'secondary' : 'light'}
            // id={}
            // data-testid={}
            />

            <Dropdown.Menu>
                <Dropdown.Item >fege</Dropdown.Item>
                <Dropdown.Item >efg</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Channel