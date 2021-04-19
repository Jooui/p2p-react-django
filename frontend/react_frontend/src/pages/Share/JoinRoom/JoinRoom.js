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
    })

    console.log(conn);


    /* WORKING WEBRTC PEERJS */
    
    //Receiver

    let loadWebrtc = () => {
        let bytesReceived2 = 0;
            let uploaded = 0;
            let downloadTimer, uploadTimer;
            let downSpeed = 0
            let upSpeed = 0;
            let lastDownTime = 0;
            let lastUpTime = 0;





            let bar = document.getElementById('bar');
            let spanP = document.getElementById('progress')

            const peer = new Peer('receiver', { host: 'localhost', port: 9000, path: '/' })

            peer.on('connection', (conn) => {
                conn.on('data', (data) => {
                    console.log(data);
                })


                let incomingFileInfo;
                let incomingFileData;
                let bytesReceived;
                let downloadInProgress = false;

                conn.on('data', data => {
                    if (downloadInProgress === false) {
                        startDownload(data);
                    } else {
                        progressDownload(data);
                    }
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
                    bar.style.width = ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
                    spanP.innerHTML = 'Progress: ' + ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
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
            })
    }


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