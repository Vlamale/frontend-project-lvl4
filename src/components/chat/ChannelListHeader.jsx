import React from 'react'
import { Button } from 'react-bootstrap'

const ChannelListHeader = () => {
    return (
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <Button variant="outline-primary" size='sm'>+</Button>
        </div>
    )
}

export default ChannelListHeader