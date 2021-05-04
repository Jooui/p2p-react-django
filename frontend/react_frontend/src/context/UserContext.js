// import useUser from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { getToken } from '../services/jwt.service'
import LoginService from '../services/login.service'
import { io } from "socket.io-client";
import ProfileService from 'services/profile.service';
// const ENDPOINT = "https://3000-apricot-pinniped-h320hydn.ws-eu03.gitpod.io/";
import { NODEJS_URL } from "common/config";


const Context = React.createContext({})

export function UserContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true)
  const [isSocketio, setIsSocketio] = useState(false)
  // const [socketIo, setSocketIo] = useState(io("http://localhost:4200"))
  const [socketIo, setSocketIo] = useState()

  const [DB, setDB] = useState()

  const checkAuth = () => {
    if (getToken()) {
      LoginService.getLoggedUser().then((data) => {
        // setSocketIo(io("http://localhost:4200"))
        // socketIo.emit('newuser', {username:user.user.username, socketid: socketIo.id})
        setUser(data)
        setJwt(data.user.token)
        setIsLogin(false)
        // setTimeout(() => {
        // }, 50);
      })
      return getToken()
    } else {
      setIsLogin(false)
    }
  }

  const [jwt, setJwt] = useState(() => checkAuth())
  const [user, setUser] = useState(null)
  const [friends, setFriends] = useState()
  const [adminPanel, setAdminPanel] = useState(localStorage.getItem('isPanelAdmin'))

  if (!socketIo) setSocketIo(io(NODEJS_URL))

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        socketIo.emit('newuser', { username: user.user.username, socketid: socketIo.id })
        setIsSocketio(true)
      }, 400);

    }
  }, [user])

  useEffect(() => {

    let openRequest = indexedDB.open("peerappDB", 1);

    openRequest.onupgradeneeded = function() {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains('chats')) { // if there's no "chats" store
        db.createObjectStore('chats', {keyPath: 'id'}); // create it
      }
    };

    openRequest.onerror = function () {
      console.error("Error", openRequest.error);
    };

    openRequest.onsuccess = function () {
      let db = openRequest.result;
      setDB(openRequest.result)
    };

  }, [])



  return <Context.Provider value={{ jwt, setJwt, user, setUser, socketIo, setSocketIo, friends, setFriends, adminPanel, setAdminPanel, DB, setDB, isLogin, isSocketio, setIsSocketio }}>
    {children}
  </Context.Provider>
}

export default Context


// const getFriends = () => {
//   return 
// }