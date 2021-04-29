import { Link } from "react-router-dom";
import './Header.css';

import useUser from 'hooks/useUser'

const Header = () => {
  const { isAuthenticated, currentUser, socketIo } = useUser()

  return (
    <header className="main-header">
      <Link to="/" className="titleApp">Peer-App</Link>
      <nav>
        <div className="header-item">
          <Link to="/">Home</Link>
          <div className="underline-item"></div>
        </div>
        <div className="header-item">
          {/* <Link to="/">Pricing</Link> */}
          <a href="#section-subscriptions">Pricing</a>
          <div className="underline-item"></div>
        </div>
        {/* <div className="header-item">
          <Link to="/about">About</Link>
          <div className="underline-item"></div>
        </div> */}
        <div className="header-item">
          {isAuthenticated && currentUser ?
            currentUser ?
              <Link to={"/profile/" + currentUser.username}>Profile</Link> :
              <Link to={"/profile/"}>Profile</Link>
            : <Link to="/login">Login</Link>}
          <div className="underline-item"></div>
        </div>

        <div className="header-item">
          {isAuthenticated && currentUser ?
            currentUser.is_admin ?
              <Link to={"/admin"}>Panel Admin</Link> :
              null : null}
          <div className="underline-item"></div>
        </div>
      </nav>

    </header>
  )
}

export default Header