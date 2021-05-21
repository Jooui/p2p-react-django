import { useContext, useCallback } from 'react';
import Context from 'context/UserContext';
import LoginService from '../services/login.service'
import { saveToken, destroyToken } from 'services/jwt.service';

export default function useUser() {
  const {
    setJwt, user, setUser,
    adminPanel, setAdminPanel,
    friends, setFriends,
    socketIo, isLogin, setSocketIo,
    isSocketio, setIsSocketio,
    DB
  } = useContext(Context)

  const login = useCallback(({ email, password }) => {
    return LoginService.login({ user: { email, password } }).then((request) => {
      console.log(request);
      if (request.errors) {
        return false
      } else {
        setJwt(request.user.token);
        setUser(request.user)
        saveToken(request.user.token)
        return true
      }
    })
  }, [setJwt, setUser])

  const register = useCallback(({ username, email, password }) => {
    return LoginService.register({ user: { username, email, password } }).then((request) => {
      console.log(request);
      if (request.errors) {
        return false
      } else {
        setJwt(request.user.token);
        setUser(request.user)
        saveToken(request.user.token)
        return true
      }
    })
  }, [setJwt, setUser])

  const logout = useCallback(() => {
    setJwt(null);
    setUser(null);
    destroyToken();
    window.location.href = '/'
  }, [setJwt, setUser])

  return {
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    adminPanel, setAdminPanel,
    isLogin,
    friends,
    currentUser: user ? user.user : null,
    socketIo,
    isSocketio, 
    setIsSocketio,
    setSocketIo,
    DB
  }
}

