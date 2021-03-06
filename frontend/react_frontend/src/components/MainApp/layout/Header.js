import { Link } from "react-router-dom";
import './Header.css';

import logo from 'assets/Logo.png'
import useUser from 'hooks/useUser'

const Header = () => {
  const { isAuthenticated, currentUser, socketIo } = useUser()

  return (
    <header className="main-header">
      <Link to="/" className="titleApp"><img src={logo} alt="logo of website"/></Link>
      <nav>
        <div className="header-item">
          <Link to="/">Home</Link>
          <div className="underline-item"></div>
        </div>
        <div className="header-item">
          <a href="#section-subscriptions">Pricing</a>
          <div className="underline-item"></div>
        </div>
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