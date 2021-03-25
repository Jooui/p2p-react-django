import { useContext, useCallback } from 'react';
import Context from 'context/PeerContext';
import Peer from 'peerjs';
import generateID from 'utils/generateID'


export default function usePeer() {
  const { peer, setPeer } = useContext(Context)

  const refresh = useCallback(() => {
    setPeer(new Peer(generateID(4), { host: 'localhost', port: 9000, path: '/myapp' }));
  }, [setPeer])

  return {
    peer: peer,
    refresh
  }
}

