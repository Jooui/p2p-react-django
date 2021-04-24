import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileCopyOutlined, ArrowForwardIos } from '@material-ui/icons';
import './AnonymousShare.css'
import usePeer from '../../../hooks/usePeer'
// import Peer from 'peerjs';
// import generateID from 'utils/generateID'

const AnonymousShare = () => {
  // const [peer] = useState(new Peer(generateID(4), { host: 'localhost', port: 9000, path: '/myapp' }))

  const {peer} = usePeer();

  console.log(peer.id);
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <div className="anonShare-container">
      <h1>Anonymous Share</h1>
      <div className="join-code">
        <label>Room Code: {peer.id}</label>
        <span className="code"></span>
        <FileCopyOutlined />
      </div>
      <section className="dropzone-container">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </section>
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

export default AnonymousShare