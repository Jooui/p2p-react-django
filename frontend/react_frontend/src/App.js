import React from "react";
import { Route, Switch } from "react-router-dom";
import BackgroundSlider from 'react-background-slider'
import Header from './components/layout/Header'
import About from "./pages/About";
// import Home from "./pages/Home";
import AnonymousShare from "./pages/AnonymousShare/AnonymousShare";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

import Friends from "./pages/Friends/Friends";

import './App.css';

// import changeBgImage from './utils/changeBgImage';
import bg1 from "./assets/images/background/bg1.jpg"
import bg2 from "./assets/images/background/bg2.png"
import bg4 from "./assets/images/background/bg4.jpg"

//Custom hooks
import useWindowDimensions from './hooks/useWindowDimensions'

export default function App() {
  const { height, width } = useWindowDimensions();
  console.log("height:", height, "Width", width)
  return (
    <main>
      <BackgroundSlider images={[bg2, bg1, bg4]} duration={30} transition={0.4} />
      <Header />
      {/* {width > 1270 ? <Login /> : <></>} */}
      <Friends/>
      <section className="wrapper">
        <Switch>
          <Route exact path="/"><AnonymousShare /></Route>
          <Route path="/about"><About /></Route>
          {/* {width < 1270 ? <Route path="/login"><Login /></Route> : <></>} */}
          <Route path="/login"><Profile /></Route>
        </Switch>
      </section>
    </main>
  );
}