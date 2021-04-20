import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
// import { Peer } from 'peerjs'
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
    // const [file, setFile] = useState();
    const chunkLength = 1000;

    // useEffect(() => {

    // })

    // let sendFile = (file) => {
    //     conn.send(file);
    // }


    conn.on('data', (data) => {
        console.log(data);
    })

    console.log(conn);


    /* WORKING WEBRTC PEERJS */

    const BYTES_PER_CHUNK = 40000;
    let file;
    let currentChunk;
    let fileInput = document.getElementById('input-file');
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

    // fileInput.on('change', function () {
    // file = fileInput[0].files[0];
    // currentChunk = 0;
    // // send some metadata about our file to the receiver
    // conn.send(JSON.stringify({
    //   fileName: file.name,
    //   fileSize: file.size
    // }));
    // readNextChunk();
    // });

    let onChangeFile = (fileInput) => {
        file = fileInput; 
        currentChunk = 0;
        // send some metadata about our file to the receiver
        conn.send(JSON.stringify({
            fileName: file.name,
            fileSize: file.size
        }));
        readNextChunk();
    }

    // SENDER
    // let loadWebrtcSender = () => {

    //     const BYTES_PER_CHUNK = 40000;
    //     let file;
    //     let currentChunk;
    //     let fileInput = document.getElementById('input-file');
    //     let fileReader = new FileReader();

    //     function readNextChunk() {
    //         let start = BYTES_PER_CHUNK * currentChunk;
    //         let end = Math.min(file.size, start + BYTES_PER_CHUNK);
    //         fileReader.readAsArrayBuffer(file.slice(start, end));
    //     }

    //     fileReader.onload = function () {
    //         conn.send(fileReader.result);
    //         currentChunk++;

    //         if (BYTES_PER_CHUNK * currentChunk < file.size) {
    //             readNextChunk();
    //         }
    //     };

    //     fileInput.onchange(function () {
    //         file = fileInput[0].files[0];
    //         currentChunk = 0;
    //         // send some metadata about our file to the receiver
    //         conn.send(JSON.stringify({
    //             fileName: file.name,
    //             fileSize: file.size
    //         }));
    //         readNextChunk();
    //     })

    //     // fileInput.on('change', function () {
    //     // file = fileInput[0].files[0];
    //     // currentChunk = 0;
    //     // // send some metadata about our file to the receiver
    //     // conn.send(JSON.stringify({
    //     //   fileName: file.name,
    //     //   fileSize: file.size
    //     // }));
    //     // readNextChunk();
    //     // });

    //     let onChangeFile = (file) => {

    //         currentChunk = 0;
    //         // send some metadata about our file to the receiver
    //         conn.send(JSON.stringify({
    //             fileName: file.name,
    //             fileSize: file.size
    //         }));
    //         readNextChunk();
    //     }
    // }

    // loadWebrtcSender()


    


    return (
        <div className="anonShare-container">
            <h1>Joined Room</h1>
            <div className="join-code">
                <label>Room Code: </label>
                <span className="code">{room}</span>
                <FileCopyOutlined />
            </div>
            <input type="file" placeholder="Choose a file" id="input-file" onChange={(e) => onChangeFile(e.target.files[0])} />
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