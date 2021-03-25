import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { FileCopyOutlined, ArrowForwardIos } from '@material-ui/icons';
import './JoinRoom.css'
import usePeer from 'hooks/usePeer';

function saveToDisk(fileUrl, fileName) {
  let save = document.createElement('a');
  save.href = fileUrl;
  save.target = '_blank';
  save.download = fileName || fileUrl;

  let event = document.createEvent('Event');
  event.initEvent('click', true, true);

  save.dispatchEvent(event);
  (window.URL || window.webkitURL).revokeObjectURL(save.href);
}

const JoinRoom = () => {
  const { peer } = usePeer()
  let { room } = useParams();
  const [conn, setConn] = useState(peer.connect(room))
  const [file, setFile] = useState();
  const chunkLength = 1000;

  // useEffect(() => {

  // })

  let sendFile = (file) => {
    conn.send(file);
  }


  conn.on('data', (data) => {
    console.log(data);
  } )

  // var conn = peer.connect('dest-peer-id');

  console.log(conn);

  return (
    <div className="anonShare-container">
      <h1>Joined Room</h1>
      <div className="join-code">
        <label>Room Code: </label>
        <span className="code">{room}</span>
        <FileCopyOutlined />
      </div>
      <input type="file" placeholder="Choose a file" id="input-file" onChange={(e) => sendFile(e.target.files[0])} />
      <section className="anonShare-container--bottom">
        <section className="added-files">
          <div className="share-btn">Share {<ArrowForwardIos />}</div>
          <h3>Added files</h3>
        </section>
        <section className="joined-users">
          <h3>Joined users</h3>

        </section>
      </section>

    </div>
  )
};

export default JoinRoom