import './Receiver.css'
import React, { useEffect, useState } from 'react';
import usePeer from '../../../hooks/usePeer';
import { FileCopyOutlined } from '@material-ui/icons';

let barProgress;
let spanProgress;

const Receiver = () => {

    const { peer } = usePeer();

    const [clients, setClients] = useState([]);
    // const [file, setFile] = useState();
    // const [barProgress, setBarProgress] = useState();
    // const [spanProgress, setSpanProgress] = useState();
    // const chunkLength = 1000;

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


    



    useEffect(() => {
        barProgress = document.getElementById('barProgress')
        spanProgress = document.getElementById('spanProgress')
        console.log(barProgress);
        console.log(spanProgress);
    }, [])





    peer.on('connection', function (conn) {

        conn.on('data', (data) => {
            console.log(data);
        })

        setClients([...clients, conn])

        // conn.send('hola')
        console.log(conn);

        conn.on('data', data => {
            if (downloadInProgress === false) {
                startDownload(data);
            } else {
                progressDownload(data);
            }
        });

    });


    const startDownload = (data) => {
        incomingFileInfo = JSON.parse(data.toString());
        incomingFileData = [];
        bytesReceived = 0;
        downloadInProgress = true;
        console.log('incoming file <b>' + incomingFileInfo.fileName + '</b> of ' + incomingFileInfo.fileSize + ' bytes');
    }

    const progressDownload = (data) => {

        let endTime = (new Date()).getTime();
        downSpeed = ((incomingFileInfo.fileSize - bytesReceived2) * 1000) / ((endTime - lastDownTime) * 1024);
        bytesReceived2 = incomingFileInfo.fileSize;
        lastDownTime = endTime;

        console.log(downSpeed);
        console.log(barProgress);
        bytesReceived += data.byteLength;
        incomingFileData.push(data);
        console.log('progress: ' + ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%');
        barProgress.style.width = ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
        spanProgress.innerHTML =((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
        if (bytesReceived === incomingFileInfo.fileSize) {
            endDownload();
        }
    }

    const endDownload = () => {
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


    return (
        <div className="receiver-container">
            <div className="header-top">
                <span className="title">Receiver | My room</span>
                <div className="join-room-code" onClick={() => { navigator.clipboard.writeText(peer.id) }}>
                    <label id="room-code">Code: </label>
                    <span className="code">{peer.id}</span>
                    <FileCopyOutlined />
                </div>
            </div>

            <div className="receiver-content"></div>
            <hr className="separator" />
            <div className="bottom-sender">
                <div className="progress-percent">
                    <span id="spanProgress">0%</span>
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar" id="barProgress"></div>
                </div>
            </div>
        </div>
    )
}

export default Receiver