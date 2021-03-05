import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import './AnonymousShare.css'



const AnonymousShare = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <div className="anonShare-container">
      <h1>Anonymous Share</h1>
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