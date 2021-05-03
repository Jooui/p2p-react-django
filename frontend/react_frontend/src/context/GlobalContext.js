import React, {useState} from 'react'


const GlobalContext = React.createContext({})

export function GlobalContextProvider({ children }) {
    const [showFriends, setShowFriends] = useState(false)

    return <GlobalContext.Provider value={{ showFriends, setShowFriends }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext