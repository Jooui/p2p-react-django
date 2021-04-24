import React, { useState } from 'react'



const AdminContext = React.createContext({})

export function AdminContextProvider({ children }) {

  const [page,setPage] = useState()


  return <AdminContext.Provider value={{ jwt, setJwt, user, setUser, socketIo, setSocketIo, friends, setFriends, adminPanel, setAdminPanel }}>
    {children}
  </AdminContext.Provider>
}

export default AdminContext