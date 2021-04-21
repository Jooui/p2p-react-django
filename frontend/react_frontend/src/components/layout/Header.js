import { Link } from "react-router-dom";
import './Header.css';

import useUser from 'hooks/useUser'

const Header = () => {
  const { isAuthenticated,currentUser } = useUser()
  // console.log("aaaadasdasdsadasd")
  // console.log(isAuthenticated)
  return (
    <header className="main-header">
      <h1>Peer-App</h1>
      <nav>
        <div className="header-item">
          <Link to="/">Home</Link>
          <div className="underline-item"></div>
        </div>
        <div className="header-item">
          <Link to="/about">About</Link>
          <div className="underline-item"></div>
        </div>
        <div className="header-item">
          {isAuthenticated && currentUser ?
          currentUser ? 
          <Link to={"/profile/"+currentUser.username}>Profile</Link> :
            <Link to={"/profile/"}>Profile</Link>
            : <Link to="/login">Login</Link>}
          <div className="underline-item"></div>
        </div>
      </nav>

    </header>
  )
}

export default Header