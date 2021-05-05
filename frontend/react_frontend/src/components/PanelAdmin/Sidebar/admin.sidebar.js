import { ChatOutlined, Home, HomeOutlined, HomeRounded, MenuOutlined, PaymentOutlined, PeopleAltOutlined, SettingsOutlined, Subscriptions, SwapCallsOutlined } from '@material-ui/icons'
import './admin.sidebar.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useWindowDimensions from 'hooks/useWindowDimensions';




const AdminSidebar = () => {
    const { width } = useWindowDimensions()
    const location = useLocation();
    const currentPage = location.pathname
    const { showSidebarAdmin, setShowSidebarAdmin } = useContext(GlobalContext)

    const handleOpenSidebar = (event) => {
        let el = event.target
        if (!el.classList.contains(['menu-btn']) && !el.parentElement.classList.contains(['menu-btn'])) setShowSidebarAdmin(false)
    }

    useEffect(() => {
        setShowSidebarAdmin(false)
    }, [location])

    return (

        <ClickAwayListener onClickAway={(e) => handleOpenSidebar(e)}>
            <section className={"adminSidebar " + ( width > 1200 ? '' : (showSidebarAdmin ? '' : 'hide-sidebar'))} >
                <MenuOutlined className="menu-btn sidebar-menu-btn" onClick={() => { showSidebarAdmin ? setShowSidebarAdmin(false) : setShowSidebarAdmin(true) }} />
                <div className="adminSidebar__header">
                    <h1>Peer-App</h1>
                    <h3>Admin Panel</h3>
                </div>
                <nav className="adminSidebar__nav">
                    <h4>Navigation</h4>
                    <Link to={"/dashboard"} className={"nav-item " + (currentPage === "/dashboard" ? " active" : "")}>
                        <HomeOutlined /> Dashboard
                    </Link>

                    <Link to={"/users"} className={"nav-item " + (currentPage === "/users" ? " active" : "")}>
                        <PeopleAltOutlined /> Users
                    </Link>

                    <Link to={"/subscriptions"} className={"nav-item " + (currentPage === "/suscriptions" ? " active" : "")}>
                        <PaymentOutlined /> Subscriptions
                    </Link>

                    <Link to={"/settings"} className={"nav-item " + (currentPage === "/settings" ? " active" : "")}>
                        <SettingsOutlined /> Settings
                    </Link>

                    <h4>MODULES</h4>

                    <Link to={"/"} className={"nav-item " + (currentPage === "/peer" ? " active" : "")}>
                        <SwapCallsOutlined /> PeerJS
                    </Link>

                    <Link to={"/"} className={"nav-item " + (currentPage === "/chats" ? " active" : "")}>
                        <ChatOutlined /> Chats
                    </Link>
                </nav>
            </section>
        </ClickAwayListener>)
}

export default AdminSidebar