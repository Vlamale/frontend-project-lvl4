import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import ChannelListHeader from './ChannelListHeader.jsx';
import Channel from './Сhannel.jsx';

function ChannelList() {
  const channels = useSelector(channelsSelectors.selectAll);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  return (
    <Col className="col-md-2 border-end pt-5 px-0 bg-light" xs={4}>
      <ChannelListHeader />

      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((data) => (
          <li className="w-100" key={data.id}>
            <Channel data={data} activeChannelId={activeChannelId} />
          </li>
        ))}
      </ul>
    </Col>
  );
}

export default ChannelList;
