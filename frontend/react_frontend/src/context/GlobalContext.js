import React, {useState} from 'react'


const GlobalContext = React.createContext({})

export function GlobalContextProvider({ children }) {
    const [showFriends, setShowFriends] = useState(false)
    const [showSidebarAdmin, setShowSidebarAdmin] = useState(true)

    return <GlobalContext.Provider value={{ showFriends, setShowFriends, showSidebarAdmin, setShowSidebarAdmin }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext