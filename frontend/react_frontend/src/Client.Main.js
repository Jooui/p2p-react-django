// <<<<<<<< React libraries >>>>>>>>
import React, { useContext, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Route, Switch } from "react-router-dom";
import BackgroundSlider from 'react-background-slider'

// <<<<<<<< Css files >>>>>>>>
import './App.css';
import './App_Style.css';

// <<<<<<<< Background images >>>>>>>>
import bg1 from "./assets/images/background/bg1.jpg"
import bg2 from "./assets/images/background/bg2.png"
import bg4 from "./assets/images/background/bg4.jpg"

// <<<<<<<< Custom hooks >>>>>>>>
import useWindowDimensions from './hooks/useWindowDimensions'
import useUser from './hooks/useUser'

// <<<<<<<< Contexts >>>>>>>>
import GlobalContext from 'context/GlobalContext';

// <<<<<<<< Pages >>>>>>>>
import UserProfile from "pages/MainApp/Profile/UserProfile";
import NotFound from "pages/MainApp/404/NotFound";
import MenuTransfer from "pages/MainApp/Transfer/Menu/MenuTransfer";
import Sender from "pages/MainApp/Transfer/Sender/Sender";
import Receiver from "pages/MainApp/Transfer/Receiver/Receiver";
import SubscriptionsPage from "pages/MainApp/Subscriptions/Subscriptions";
import Chat from "pages/MainApp/Chat/Chat";
import Login from "pages/MainApp/Login/Login";
import Profile from "pages/MainApp/Profile/Profile";
import Friends from "pages/MainApp/Friends/Friends";

// <<<<<<<< Components >>>>>>>>
import Header from 'components/MainApp/layout/Header'
import PrivateRoute from 'components/router/PrivateRoute'
import ScrollDownHomeBtn from "components/MainApp/ScrollDownHomeBtn/ScrollDownHomeBtn";
import OpenChatBtn from "components/MainApp/Chat/OpenChatBtn";


const ClientMain = () => {
    const { isAuthenticated, socketIo } = useUser()
    const { width } = useWindowDimensions();
    const { showFriends, setShowFriends, notifications, setNotifications, countNotifications } = useContext(GlobalContext)
    let location = useLocation();
    useEffect(() => setShowFriends(false), [location]);
    
    useEffect(() => {
        socketIo.on('receiveMsg', function (msg) {
            let path = window.location.pathname.split('/')

            if (path[1] != "chat") {
                let chats = window.localStorage.getItem('chats')
                if (chats) {
                    let chatsArr = JSON.parse(chats)
                    const index = chatsArr.map(e => e.user).indexOf(msg.sender);
                    chatsArr[index].messages = [...chatsArr[index].messages, msg];

                } else {
                    window.localStorage.setItem('chats', JSON.stringify([{ user: msg.sender, messages: [msg] }]))
                }
                let arr = [...JSON.parse(window.localStorage.getItem('notifications'))]
                arr.push({ state: "no_readed", msg: "New message of " + msg.sender })
                setNotifications(arr)
            }
        });
    }, [])

    return (
        <>
            <main className="app-container">
                <div className={"black-bg-responsive " + (width < 1250 ? (showFriends ? "" : "hide") : "hide")} onClick={() => setShowFriends(false)}></div>
                <BackgroundSlider images={[bg1, bg2, bg4]} duration={30} transition={0.4} />
                <Header />
                <div className="main-container">
                    <LoginSwitch />
                    <section className="main-content">
                        <SocketIoConnection />
                        <Routes />
                    </section>
                    {width > 978 ? <ScrollDownHomeBtn /> : null}
                </div>
                {isAuthenticated && width < 1250 ? <OpenChatBtn /> : null}
            </main>
            <SubscriptionsPage />
        </>
    )
}

// Cambiar a la vista panel administrador al clicar en btn
const SwitchToPanelAdmin = () => {
    const { isAuthenticated, logout, currentUser } = useUser()
    if (isAuthenticated && currentUser.is_admin) {
        localStorage.setItem('isPanelAdmin', true)
        window.location.reload()
    } else {
        logout()
    }

    return (<></>)
}

// Crear conexión con socket.io server
const SocketIoConnection = () => {
    const { isAuthenticated, currentUser, socketIo, isSocketio, setIsSocketio } = useUser()
    if (isAuthenticated && currentUser && !isSocketio && socketIo.id) {
        socketIo.emit('newuser', { username: currentUser.username, socketid: socketIo.id })
        setIsSocketio(true)
    }
    return (null)
}

// La finalidad de este componente es renderizar el comp. Login o Friends dependiendo de si el usuario esta logueado o no
// No se podía realizar esta comprobacion en App ya que el context aun no estaba definido
const LoginSwitch = () => {
    const { isAuthenticated, isLogin } = useUser()
    const { width } = useWindowDimensions();
    return isLogin ? null : isAuthenticated ? <Friends /> : (width > 1270 ? <Login /> : null)
}

// Main App routes
const Routes = () => {
    const { width } = useWindowDimensions();
    return (
        <Switch>
            <Route exact path="/"><MenuTransfer /></Route>
            <Route path="/admin"><SwitchToPanelAdmin /></Route>
            {
                width < 1271 ?
                    <Route path="/login"><Login /></Route> :
                    <Redirect from='/login' to='/' />
            }
            <Route path="/receiver"><Receiver /></Route>
            <Route path="/room/:room"><Sender /></Route>
            <Route path="/profile/:username"><UserProfile /></Route>
            <Route path="/chat/:username"><Chat /></Route>
            <Route path="/404"><NotFound /></Route>
            <PrivateRoute path="/profile" component={Profile} exact />
            <Redirect from='*' to='/404' />
        </Switch>
    )
}

export default ClientMain