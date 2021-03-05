import React from "react";
import { Route, Switch } from "react-router-dom";
import BackgroundSlider from 'react-background-slider'
import Header from './components/layout/Header'
import About from "./pages/About";
// import Home from "./pages/Home";
import AnonymousShare from "./pages/AnonymousShare/AnonymousShare";
import Login from "./pages/Login/Login";
import './App.css';

// import changeBgImage from './utils/changeBgImage';
import bg1 from "./assets/images/background/bg1.jpg"
import bg2 from "./assets/images/background/bg2.png"
import bg4 from "./assets/images/background/bg4.jpg"

export default function App() {
  return (
    <main>
      <BackgroundSlider images={[bg2,bg1,bg4]} duration={30} transition={0.4} />
      <Header/>
      <Login/>
      <section className="wrapper">
        <Switch>
          <Route exact path="/"><AnonymousShare /></Route>
          <Route path="/about"><About /></Route>
        </Switch>
      </section>
      
    </main>
  );
}