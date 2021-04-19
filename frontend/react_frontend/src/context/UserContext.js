import useUser from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import {getToken,saveToken,destroyToken} from '../services/jwt.service'
import LoginService from '../services/login.service'

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

  return <Context.Provider value={{ jwt, setJwt, user, setUser }}>
    {children}
  </Context.Provider>
}

export default Context