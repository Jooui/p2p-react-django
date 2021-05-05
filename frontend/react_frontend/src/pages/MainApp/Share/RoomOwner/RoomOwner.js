import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
import { FileCopyOutlined, ArrowForwardIos } from '@material-ui/icons';
import './RoomOwner.css';
import usePeer from '../../../../hooks/usePeer';
import copyToClipboard from 'utils/CopyToClipboard';
// import copyToClipboard from 'utils/copyToClipboard';


const RoomOwner = () => {

  let bytesReceived2 = 0;
  // let uploaded = 0;
  // let downloadTimer, uploadTimer;
  let downSpeed = 0
  // let upSpeed = 0;
  let lastDownTime = 0;
  // let lastUpTime = 0;

  let incomingFileInfo;
  let incomingFileData;
  let bytesReceived;
  let downloadInProgress = false;

  let bar = document.getElementById('bar_progress');
  console.log(bar);
  // let spanP = document.getElementById('progress')



  const { peer } = usePeer();
  const [clients, setClients] = useState([]);
  // const [file, setFile] = useState();
  // const chunkLength = 1000;

  console.log(peer.id);

  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);


  })

  peer.on('connection', function (conn) {

    conn.on('data', (data) => {
      console.log(data);
    })

    setClients([...clients, conn])

    conn.send('hola')
    console.log(conn);




    conn.on('data', data => {
      if (downloadInProgress === false) {
        startDownload(data);
      } else {
        progressDownload(data);
      }
    });

  });

  function startDownload(data) {
    incomingFileInfo = JSON.parse(data.toString());
    incomingFileData = [];
    bytesReceived = 0;
    downloadInProgress = true;
    console.log('incoming file <b>' + incomingFileInfo.fileName + '</b> of ' + incomingFileInfo.fileSize + ' bytes');
  }

  function progressDownload(data) {

    var endTime = (new Date()).getTime();
    downSpeed = ((incomingFileInfo.fileSize - bytesReceived2) * 1000) / ((endTime - lastDownTime) * 1024);
    bytesReceived2 = incomingFileInfo.fileSize;
    lastDownTime = endTime;

    console.log(downSpeed);

    bytesReceived += data.byteLength;
    incomingFileData.push(data);
    console.log('progress: ' + ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%');
    // bar.style.width = ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
    // spanP.innerHTML = 'Progress: ' + ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
    if (bytesReceived === incomingFileInfo.fileSize) {
      endDownload();
    }
  }

  function endDownload() {
    downloadInProgress = false;
    let blob = new window.Blob(incomingFileData);
    let anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = incomingFileInfo.fileName;
    anchor.textContent = 'XXXXXXX';

    if (anchor.click) {
      anchor.click();
    } else {
      let evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      anchor.dispatchEvent(evt);
    }
  }

  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  // }, [])

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="anonShare-container">
      <h1>Anonymous Share</h1>
      <div className="join-code" onClick={() => { copyToClipboard(peer.id) }}>
        <label id="room-code">Room Code: {peer.id}</label>
        <span className="code"></span>
        <FileCopyOutlined />
      </div>
      <section className="dropzone-container">
        {/* <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div> */}
        {/* <input type="file" placeholder="Choose a file" id="input-file" onChange={(e) => setFile(e.target.files[0])} /> */}
        <input type="file" placeholder="Choose a file" id="input-file" />
      </section>
      <section className="anonShare-container--bottom">
        <section className="added-files">
          <div className="share-btn">Share {<ArrowForwardIos />}</div>
          <h3>Added files</h3>
        </section>
        <div className="container-loading">
          <div className="bar" id="bar_progress"></div>
        </div>
        <br />
        <span id="progress"></span>

        <section className="joined-users">
          <h3>Joined users</h3>
          <div id="users-wrapper">
            {clients.map(function (client) { return <span key={client.peer}>{client.peer}</span> })}
          </div>
        </section>
      </section>

    </div>
  )
};

export default RoomOwner