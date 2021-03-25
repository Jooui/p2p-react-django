import React, {useState} from 'react'
import Peer from 'peerjs';
import generateID from 'utils/generateID'

const Context = React.createContext({})

export function PeerContext({ children }) {
    const [peer, setPeer] = useState(() => new Peer(generateID(4), { host: 'localhost', port: 9000, path: '/myapp' }))

    return <Context.Provider value={{ peer, setPeer }}>
        {children}
    </Context.Provider>
}

export default Context