import React, {useState} from 'react'
import Peer from 'peerjs';
import generateID from 'utils/generateID'
import { PEERJS_URL, PEERJS_PORT } from 'common/config';

const Context = React.createContext({})

export function PeerContext({ children }) {
    const [peer, setPeer] = useState(() => new Peer(generateID(4), { host: PEERJS_URL, port: PEERJS_PORT, path: '/myapp' }))

    return <Context.Provider value={{ peer, setPeer }}>
        {children}
    </Context.Provider>
}

export default Context