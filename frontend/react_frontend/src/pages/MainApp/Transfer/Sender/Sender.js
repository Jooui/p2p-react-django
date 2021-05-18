import { Close, FileCopyOutlined, PublishRounded } from '@material-ui/icons'
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import './Sender.css'
import usePeer from 'hooks/usePeer';
import { Button } from '@material-ui/core';

let barProgress;
let spanProgress;

const Sender = () => {
    const { peer } = usePeer()
    let { room } = useParams();
    const [conn, setConn] = useState(null)
    const [file, setFile] = useState()
    const BYTES_PER_CHUNK = 40000;
    // let file;
    let currentChunk;
    let fileInput;
    let fileReader = new FileReader();

    // AFTER RENDER
    useEffect(() => {
        fileInput = document.getElementById('input-file-sender')
        if (!conn) setConn(peer.connect(room))
        barProgress = document.getElementById('barProgress')
        spanProgress = document.getElementById('spanProgress')
    }, [])

    const readNextChunk = () => {
        let start = BYTES_PER_CHUNK * currentChunk;
        let end = Math.min(file.size, start + BYTES_PER_CHUNK);
        fileReader.readAsArrayBuffer(file.slice(start, end));
    }

    fileReader.onload = function () {
        conn.send(fileReader.result);
        currentChunk++;
        let bytesPerChunk = ((BYTES_PER_CHUNK * currentChunk / file.size) * 100).toFixed(2)
        spanProgress.innerHTML = (bytesPerChunk > 100 ? 100 : bytesPerChunk) + '%'
        barProgress.style.width = (bytesPerChunk > 100 ? 100 : bytesPerChunk) + '%'

        if (BYTES_PER_CHUNK * currentChunk < file.size) {
            readNextChunk();
        }
    };

    let onChangeFile = (fileInput) => {
        setFile(fileInput)
    }


    let handleStart = (file) => {
        if (file) {
            spanProgress.innerHTML = '0%'
            barProgress.style.width = '0%'
            currentChunk = 0;
            // send some metadata about our file to the receiver
            conn.send(JSON.stringify({
                fileName: file.name,
                fileSize: file.size
            }));
            readNextChunk();
        }
    }

    let handleRemoveFile = () => {
        setFile()
    }


    return (
        <div className="sender-container">
            <div className="data-container">
                <div className="left-side">
                    <div className="left-side__header">
                        <span className="title">Send</span>
                        <div className="join-room-code" onClick={() => { navigator.clipboard.writeText(room) }}>
                            <label id="room-code">Code: </label>
                            <span className="code">{room}</span>
                            <FileCopyOutlined />
                        </div>
                    </div>
                    <label for="input-file-sender" className="select-file-btn"><PublishRounded /> Choose a file...</label>
                    <input type="file" id="input-file-sender" onChange={(e) => onChangeFile(e.target.files[0])}/>
                    {
                        file ?
                            <div className="file-selected-container">
                                <span className="file-selected-title">{file.name}</span> 
                                <span>Size: <strong>{(file.size/1000000).toFixed(2)}MB</strong></span> 
                                <div className="file-selected-remove-btn" onClick={handleRemoveFile}><Close /></div>
                            </div> : null
                    }
                </div>
                <div className="vertical-separator"></div>
                <div className="right-side">
                    <span className="title">Joined</span>
                    <div className="joined-wrapper">
                        <span className="user">jrevertvila</span>
                        <span className="user">vicnx</span>
                        <span className="user">tonomolla</span>
                    </div>
                </div>
            </div>
            <hr className="separator" />
            <div className="bottom-sender">
                <div className="progress-percent">
                    <span id="spanProgress">0%</span>
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar" id="barProgress"></div>
                </div>
                <button className="send-btn" id="send-btn" onClick={e => handleStart(file)}>Send</button>
            </div>
        </div>
    )
}

export default Sender