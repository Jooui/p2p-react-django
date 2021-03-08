import { useContext, useCallback } from 'react';
import Context from 'context/UserContext';


export default function useUser() {
  const { jwt, setJwt } = useContext(Context)

  const login = useCallback(({email, password}) => {
    setJwt('test');
  }, [setJwt])

  const logout = useCallback(() => {
    console.log("logout")
    setJwt(null);
  }, [setJwt])

  return {
    isAuthenticated: Boolean(jwt),
    login,
    logout
  }
}

