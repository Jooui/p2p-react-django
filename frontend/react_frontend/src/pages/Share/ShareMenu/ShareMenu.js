import React, { useState } from 'react'
import { Link } from "react-router-dom";

import { ArrowForwardIos } from '@material-ui/icons';

import './ShareMenu.css'
// import usePeer from '../../../hooks/usePeer'
// import { Link } from '@material-ui/core';

const ShareMenu = () => {
  const [room, setRoom] = useState('')
  // let history = useHistory();
  // const { peer } = usePeer();



  return (
    <div className="share-menu-container">
      <h1>Choose one option</h1>

      <section className="menu-options">
        <Link to="/myroom" className="create-room-btn">Create Room</Link>
        {/* <div className="create-room-btn" onClick={() => }>Create Room</div> */}
        <div className="join-container">
          <input type="text" id="join_id" className="input-join" placeholder="Room code.." onChange={(e) => setRoom(e.target.value)} value={room}></input>
          <Link to={"/room/" + room} className="join-room-btn"><ArrowForwardIos /></Link>
          {/* <div className="join-room-btn"><ArrowForwardIos /></div> */}
        </div>
      </section>

    </div>
  )
};

export default ShareMenu