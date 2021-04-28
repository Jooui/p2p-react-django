import React from "react";
import { Route, Switch } from "react-router-dom";
import BackgroundSlider from 'react-background-slider'
import Header from './components/MainApp/layout/Header'
import PrivateRoute from './components/router/PrivateRoute'
import About from "./pages/MainApp/About/About";
// Import Home from "./pages/Home";
// import AnonymousShare from "./pages/AnonymousShare/AnonymousShare";
// import ShareMenu from "./pages/Share/ShareMenu/ShareMenu";

import Login from "./pages/MainApp/Login/Login";
import Profile from "./pages/MainApp/Profile/Profile";

import Friends from "./pages/MainApp/Friends/Friends";

import './App.css';
import './App_Style.css';

// Import changeBgImage from './utils/changeBgImage';
import bg1 from "./assets/images/background/bg1.jpg"
import bg2 from "./assets/images/background/bg2.png"
import bg4 from "./assets/images/background/bg4.jpg"

// Custom hooks
import useWindowDimensions from './hooks/useWindowDimensions'
import useUser from './hooks/useUser'


// Import Contexts
import { UserContextProvider } from './context/UserContext';
import { PeerContext } from './context/PeerContext';
import RoomOwner from "pages/MainApp/Share/RoomOwner/RoomOwner";
// import JoinRoom from "pages/Share/JoinRoom/JoinRoom";
import UserProfile from "pages/MainApp/Profile/UserProfile";
import NotFound from "pages/MainApp/404/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// import EditProfile from "pages/Profile/EditProfile";
import MenuTransfer from "pages/MainApp/Transfer/Menu/MenuTransfer";
import Sender from "pages/MainApp/Transfer/Sender/Sender";
import Receiver from "pages/MainApp/Transfer/Receiver/Receiver";
import PanelAdminMain from "pages/PanelAdmin/Main";
import DisappearedLoading from "react-loadingg/lib/DisappearedLoading";



export default function App() {
  return (
    <PeerContext>
      <UserContextProvider>
        <main className="App">
          <PanelAdminSwitch />
        </main>
      </UserContextProvider>
    </PeerContext>
  );
}


// La finalidad de este componente es renderizar el comp. Login o Friends dependiendo de si el usuario esta logueado o no
// No se podía realizar esta comprobacion en App ya que el context aun no estaba definido
const LoginSwitch = () => {
  const { isAuthenticated, isLogin } = useUser()
  return (
    <>
      {
        isLogin ? null :
          isAuthenticated ? <Friends /> : <Login />
      }
    </>
  )
}

const PanelAdminSwitch = () => {
  const { adminPanel } = useUser()
  const { width } = useWindowDimensions();
  return (
    <>
      {
        adminPanel === 'true' ? <PanelAdminMain /> :
          <>
            <BackgroundSlider images={[bg1, bg2, bg4]} duration={30} transition={0.4} />
            <main className="app-container">
              <Header />
              <div className="main-container">
                {
                  width > 1270 ?
                    <LoginSwitch /> :
                    null
                }

                <section className="main-content">
                  <Switch>
                    <Route exact path="/"><MenuTransfer /></Route>
                    <Route path="/admin"><SwitchToPanelAdmin /></Route>
                    <Route path="/about"><About /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/myroom"><RoomOwner /></Route>
                    <Route path="/receiver"><Receiver /></Route>
                    <Route path="/room/:room"><Sender /></Route>
                    <Route path="/profile/:username"><UserProfile /></Route>
                    <Route path="/404"><NotFound /></Route>
                    <PrivateRoute path="/profile" component={Profile} exact />
                    <Redirect from='*' to='/404' />
                  </Switch>
                </section>
              </div>
            </main>



          </>
      }
    </>)
}


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