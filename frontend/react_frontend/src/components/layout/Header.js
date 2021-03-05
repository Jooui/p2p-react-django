import { Link } from "react-router-dom";
import './Header.css';

const About = () => {
  return (
    <header className="main-header">
      <h1>Peer-App</h1>
      <nav>
        <div className="header-item">
          <Link to="/">Home</Link>
          <h3 className="underline-item"></h3>
        </div>
        <div className="header-item">
          <Link to="/about">About</Link>
          <h3 className="underline-item"></h3>
        </div>
        <div className="header-item">
          <Link to="/products">Login</Link>
          <h3 className="underline-item"></h3>
        </div>
      </nav>

    </header>
  )
}

export default About