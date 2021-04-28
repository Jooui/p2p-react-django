import { useContext, useCallback, useState } from 'react';
import Context from 'context/UserContext';
import LoginService from '../services/login.service'
import { saveToken, destroyToken } from 'services/jwt.service';
import ProfileService from 'services/profile.service';

export default function useUser() {
  const {
    setJwt, user, setUser,
    adminPanel, setAdminPanel,
    friends, setFriends,
    socketIo, isLogin
  } = useContext(Context)


  const refreshFriends = useCallback(() => {
    ProfileService.getFollowingProfiles().then((data) => {
      setFriends(data)
    })
  }, [friends])


  const handlePanelAdmin = () => {
    if (user) {
      if (user.type === 'admin') {
        setAdminPanel(true)

      } else {
        setAdminPanel(false)
      }
    }
  }


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
    // getFriends,
    refreshFriends,
    isLogin,
    friends,
    currentUser: user ? user.user : null,
    socketIo
  }
}

