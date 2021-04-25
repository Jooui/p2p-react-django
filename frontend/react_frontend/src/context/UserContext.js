// import useUser from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { getToken } from '../services/jwt.service'
import LoginService from '../services/login.service'
import socketIOClient from "socket.io-client";
import ProfileService from 'services/profile.service';
// const ENDPOINT = "https://3000-apricot-pinniped-h320hydn.ws-eu03.gitpod.io/";
const ENDPOINT = "http://localhost:4200";

const Context = React.createContext({})

export function UserContextProvider({ children }) {

  const checkAuth = () => {
    if (getToken()) {
      LoginService.getLoggedUser().then((data) => {
        setUser(data)
        setJwt(data.user.token)
      })
      return getToken()
    }
  }

  const [jwt, setJwt] = useState(() => checkAuth())
  const [user, setUser] = useState(null)
  const [socketIo, setSocketIo] = useState()
  const [friends, setFriends] = useState()
  const [adminPanel, setAdminPanel] = useState(localStorage.getItem('isPanelAdmin'))

  useEffect(() => {
    ProfileService.getFollowingProfiles().then((data) => setFriends(data))
  }, [])



  return <Context.Provider value={{ jwt, setJwt, user, setUser, socketIo, setSocketIo, friends, setFriends, adminPanel, setAdminPanel }}>
    {children}
  </Context.Provider>
}

export default Context


// const getFriends = () => {
//   return 
// }