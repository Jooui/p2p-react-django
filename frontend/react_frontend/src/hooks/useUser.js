import { useContext, useCallback } from 'react';
import Context from 'context/UserContext';
import LoginService from '../services/login.service'
import { saveToken, destroyToken } from 'services/jwt.service';



export default function useUser() {
  const { jwt, setJwt } = useContext(Context)
  const { user, setUser } = useContext(Context)

  const login = useCallback(({ email, password }) => {
    return LoginService.login({user:{email,password}}).then((request) => {
      if(request.errors){
        //failed login

      }else{
        //login correct
        setJwt(request.user.token);
        setUser(request.user)
        saveToken(request.user.token)
      }
    })
  }, [setJwt])

  const logout = useCallback(() => {
    setJwt(null);
    setUser(null);
    destroyToken();
    window.location.href = '/'
  }, [setJwt])

  return {
    isAuthenticated: Boolean(user),
    login,
    logout,
    currentUser: user ? user.user : null
  }
}

