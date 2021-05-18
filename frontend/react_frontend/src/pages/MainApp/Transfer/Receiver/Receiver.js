import './Receiver.css'
import React, { useEffect, useState, useContext } from 'react';
import usePeer from '../../../../hooks/usePeer';
import { FileCopyOutlined } from '@material-ui/icons';
import copyToClipboard from 'utils/CopyToClipboard';
import GlobalContext from 'context/GlobalContext'

let barProgress;
let spanProgress;

const Receiver = () => {
    const { peer } = usePeer();
    const [clients, setClients] = useState([]);
    const [files, setFiles] = useState([]);
    let incomingFileInfo;
    let incomingFileData;
    let bytesReceived;
    let downloadInProgress = false;

    let currentDownloading = ""

    const { receiverConnectionLoaded, setReceiverConnectionLoaded } = useContext(GlobalContext)

    useEffect(() => {
        barProgress = document.getElementById('barProgress')
        spanProgress = document.getElementById('spanProgress')

        if (!receiverConnectionLoaded) {
            peer.on('connection', function (conn) {
                setClients([...clients, conn])
                conn.on('data', data => {
                    if (downloadInProgress === false) {
                        startDownload(data);
                    } else {
                        progressDownload(data);
                    }
                });
            });
        }
        setReceiverConnectionLoaded(true)
    }, [])


    const startDownload = (data) => {
        incomingFileInfo = JSON.parse(data.toString());
        let fileMeta = { ...incomingFileInfo, ext: incomingFileInfo.fileName.split('.').pop(), progress: 0 }
        currentDownloading = incomingFileInfo.fileName
        setFiles([...files,fileMeta])
        incomingFileData = [];
        bytesReceived = 0;
        downloadInProgress = true;
    }

    const progressDownload = (data) => {
        bytesReceived += data.byteLength;
        incomingFileData.push(data);
        barProgress.style.width = ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
        spanProgress.innerHTML = ((bytesReceived / incomingFileInfo.fileSize) * 100).toFixed(2) + '%'
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
                <div className="join-room-code" onClick={() => { copyToClipboard(peer.id) }}>
                    <label id="room-code">Code: </label>
                    <span className="code">{peer.id}</span>
                    <FileCopyOutlined />
                </div>
            </div>

            <div className="receiver-content">
                {
                    files.map(e =>
                        <div className="incomming-file-container" key={e.fileName}>
                            <article id={e.fileName} className="incomming-file-box">
                                <div 
                                // className={"box-bg-progress "+ (e.progress == 100 ? "box-bg-complete" : "")}
                                style={{width:(e.progress + "%")}}></div>
                                <span className="box-title">{e.ext}</span>
                                {/* <span className="box-percent">{e.progress}%</span> */}
                            </article>
                            <span>{e.fileName}</span>
                        </div>)
                }
            </div>
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