import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileCopyOutlined, ArrowForwardIos } from '@material-ui/icons';
import './RoomOwner.css';
import usePeer from '../../../hooks/usePeer';
// import copyToClipboard from 'utils/copyToClipboard';

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

const RoomOwner = () => {

  const { peer } = usePeer();
  const [clients, setClients] = useState([]);
  const [file, setFile] = useState();
  const chunkLength = 1000;

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
  });

  function onReadAsDataURL(event, text) {
    let data = {}; // data object to transmit over data channel

    if (event) text = event.target.result; // on first invocation

    if (text.length > chunkLength) {
      data.message = text.slice(0, chunkLength); // getting chunk using predefined chunk length
    } else {
      data.message = text;
      data.last = true;
    }

    // dataChannel.send(data); // use JSON.stringify for chrome!
    clients[0].send(data);

    let remainingDataURL = text.slice(data.message.length);
    if (remainingDataURL.length) setTimeout(function () {
      onReadAsDataURL(null, remainingDataURL); // continue transmitting
    }, 500)
  }


  let sendFile = () => {
    let reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onload = onReadAsDataURL;



    clients[0].send(file);
  }



  let arrayToStoreChunks = [];


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })





  /* Working WEBRTC PEERJS FUNCTIONS */

// SENDER
  let loadWebrtc = () => {
    const peer = new Peer('sender', { host: 'localhost', port: 9000, path: '/' })

            const conn = peer.connect('receiver')

            // conn.on('open', () => {
            //     // conn.send('hi!')
            // })

            const BYTES_PER_CHUNK = 40000;
            let file;
            let currentChunk;
            let fileInput = $('input[type=file]');
            let fileReader = new FileReader();

            function readNextChunk() {
                let start = BYTES_PER_CHUNK * currentChunk;
                let end = Math.min(file.size, start + BYTES_PER_CHUNK);
                fileReader.readAsArrayBuffer(file.slice(start, end));
            }

            fileReader.onload = function () {
                conn.send(fileReader.result);
                currentChunk++;

                if (BYTES_PER_CHUNK * currentChunk < file.size) {
                    readNextChunk();
                }
            };

            fileInput.on('change', function () {
                file = fileInput[0].files[0];
                currentChunk = 0;
                // send some metadata about our file to the receiver
                conn.send(JSON.stringify({
                    fileName: file.name,
                    fileSize: file.size
                }));
                readNextChunk();
            });
  }













  return (
    <div className="anonShare-container">
      <h1>Anonymous Share</h1>
      <div className="join-code" onClick={() => { navigator.clipboard.writeText(peer.id) }}>
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
        <input type="file" placeholder="Choose a file" id="input-file" onChange={(e) => setFile(e.target.files[0])} />
      </section>
      <section className="anonShare-container--bottom">
        <section className="added-files">
          <div className="share-btn" onClick={() => sendFile()}>Share {<ArrowForwardIos />}</div>
          <h3>Added files</h3>
        </section>
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