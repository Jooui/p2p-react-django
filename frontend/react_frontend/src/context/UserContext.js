// import useUser from 'hooks/useUser'
import React, { useState } from 'react'
import {getToken} from '../services/jwt.service'
import LoginService from '../services/login.service'
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://3000-apricot-pinniped-h320hydn.ws-eu03.gitpod.io/";
// const ENDPOINT = "http://localhost:4200";

const Context = React.createContext({})

export function UserContextProvider({ children }) {

  const checkAuth = () => {
    if (getToken()){
      LoginService.getLoggedUser().then((data)=>{
        setUser(data)
        setJwt(data.user.token)
      })
      return getToken()
    }
  }

  const [jwt, setJwt] = useState( () => checkAuth())
  const [user, setUser] = useState(null)
  const [socketIo, setSocketIo] = useState(socketIOClient(ENDPOINT))

  return <Context.Provider value={{ jwt, setJwt, user, setUser, socketIo, setSocketIo }}>
    {children}
  </Context.Provider>
}

export default Context