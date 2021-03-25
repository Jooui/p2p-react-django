import React, {useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import BackgroundSlider from 'react-background-slider'
import Header from './components/layout/Header'
import PrivateRoute from './components/router/PrivateRoute'
import About from "./pages/About";
// Import Home from "./pages/Home";
// import AnonymousShare from "./pages/AnonymousShare/AnonymousShare";
import ShareMenu from "./pages/Share/ShareMenu/ShareMenu";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

import Friends from "./pages/Friends/Friends";

import './App.css';

// Import changeBgImage from './utils/changeBgImage';
import bg1 from "./assets/images/background/bg1.jpg"
import bg2 from "./assets/images/background/bg2.png"
import bg4 from "./assets/images/background/bg4.jpg"

// Custom hooks
// import useWindowDimensions from './hooks/useWindowDimensions'
import useUser from './hooks/useUser'


// Import Contexts
import { UserContextProvider } from './context/UserContext';
import { PeerContext } from './context/PeerContext';
import RoomOwner from "pages/Share/RoomOwner/RoomOwner";
import JoinRoom from "pages/Share/JoinRoom/JoinRoom";



export default function App() {
  // const { height, width } = useWindowDimensions();
  const { isAuthenticated } = useUser()
  
  useEffect(() => {
    console.log("ESTADO DE USER CAMBIADO: ",isAuthenticated)
  }, [isAuthenticated])
  return (
    <PeerContext>
      <UserContextProvider>
        <main className="App">
          <BackgroundSlider images={[bg2, bg1, bg4]} duration={30} transition={0.4} />
          <Header />
          {isAuthenticated ? <Friends/> : <Login/>}
          <section className="wrapper">
            <Switch>
              <Route exact path="/"><ShareMenu /></Route>
              <Route path="/about"><About /></Route>
              <Route path="/login"><Login /></Route>
              <Route path="/myroom"><RoomOwner /></Route>
              <Route path="/room/:room"><JoinRoom /></Route>

              <PrivateRoute  path="/profile"  component={Profile}  exact />
              {/* <Route path="/profile"><Profile /></Route> */}
            </Switch>
          </section>
        </main>
      </UserContextProvider>
    </PeerContext>
  );
}