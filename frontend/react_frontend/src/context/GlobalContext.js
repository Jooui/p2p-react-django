import React, {useEffect, useState} from 'react'


const GlobalContext = React.createContext({})

export function GlobalContextProvider({ children }) {
    const [showFriends, setShowFriends] = useState(false)
    const [showSidebarAdmin, setShowSidebarAdmin] = useState(true)
    const [notifications, setNotifications] = useState([])
    const [countNotifications, setCountNotifications] = useState()
    const [receiverConnectionLoaded, setReceiverConnectionLoaded] = useState(false)
    
    useEffect(() => {
        window.localStorage.setItem('notifications', JSON.stringify(notifications))
        let count = 0
        notifications.map((e) => e.state == 'no_readed' ? count++ : null)
        setCountNotifications(count)
        // console.log("notifications", notifications);
        // console.log("entra", countNotifications);
    },[notifications])

    return <GlobalContext.Provider value={{ showFriends, setShowFriends, showSidebarAdmin, setShowSidebarAdmin, notifications, setNotifications, countNotifications, receiverConnectionLoaded, setReceiverConnectionLoaded }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext