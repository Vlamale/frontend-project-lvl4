import React from 'react'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { channelsSelectors } from '../../slices/channelsSlice.js'
import ChannelListHeader from './ChannelListHeader.jsx'
import Channel from './Сhannel.jsx'

const ChannelList = () => {
    const channels = useSelector(channelsSelectors.selectAll)
    const activeChannelId = useSelector(state => state.channels.activeChannelId)

    return (
        <Col xs={4} className="col-md-2 border-end pt-5 px-0 bg-light">
            <ChannelListHeader />

            <ul className="nav flex-column nav-pills nav-fill px-2">
                {channels.map((data) => (
                    <Channel key={data.id} data={data} activeChannelId={activeChannelId} />
                ))}
            </ul>
        </Col>
    )
}

export default ChannelList