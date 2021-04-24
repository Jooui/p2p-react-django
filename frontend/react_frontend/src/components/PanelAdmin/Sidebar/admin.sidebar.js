import { ChatOutlined, Home, HomeOutlined, HomeRounded, PaymentOutlined, PeopleAltOutlined, SettingsOutlined, Subscriptions, SwapCallsOutlined } from '@material-ui/icons'
import './admin.sidebar.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const AdminSidebar = () => {
    const location = useLocation();
    const currentPage = location.pathname
    return (
        <>
            <section className="adminSidebar">
                <div className="adminSidebar__header">
                    <h1>Peer-App</h1>
                    <h3>Admin Panel</h3>
                </div>
                <nav className="adminSidebar__nav">
                    <h4>Navigation</h4>
                    <Link to={"/dashboard"} className={"nav-item " + (currentPage === "/dashboard" ? " active": "")}>
                        <HomeOutlined /> Dashboard
                    </Link>

                    <Link to={"/users"} className={"nav-item " + (currentPage === "/users" ? " active": "")}>
                        <PeopleAltOutlined /> Users
                    </Link>

                    <Link to={"/subscriptions"} className={"nav-item " + (currentPage === "/suscriptions" ? " active": "")}>
                        <PaymentOutlined /> Subscriptions
                    </Link>

                    <Link to={"/settings"} className={"nav-item " + (currentPage === "/settings" ? " active": "")}>
                        <SettingsOutlined /> Settings
                    </Link>

                    <h4>MODULES</h4>

                    <Link to={"/"} className={"nav-item " + (currentPage === "/peer" ? " active": "")}>
                        <SwapCallsOutlined /> PeerJS
                    </Link>

                    <Link to={"/"} className={"nav-item " + (currentPage === "/chats" ? " active": "")}>
                        <ChatOutlined /> Chats
                    </Link>
                </nav>
            </section>
        </>)
}

export default AdminSidebar