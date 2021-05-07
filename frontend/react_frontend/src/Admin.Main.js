// <<<<<<<< React libraries >>>>>>>>
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom'

// <<<<<<<< Css files >>>>>>>>
import './admin.main.css'

// <<<<<<<< Pages >>>>>>>>
import AdminDashboard from 'pages/PanelAdmin/Dashboard/admin.dashboard';
import AdminUsers from 'pages/PanelAdmin/Users/admin.users';
import AdminSubscriptions from 'pages/PanelAdmin/Subscriptions/admin.subscriptions';
import AdminSettings from 'pages/PanelAdmin/Settings/admin.settings';

// <<<<<<<< Hooks >>>>>>>>
import useUser from 'hooks/useUser';

// <<<<<<<< Components >>>>>>>>
import AdminHeader from 'components/PanelAdmin/Header/admin.header'
import AdminSidebar from 'components/PanelAdmin/Sidebar/admin.sidebar'


const PanelAdminMain = () => {
    const { currentUser } = useUser()
    const location = useLocation();

    if (currentUser)
        if (!currentUser.is_admin) {
            window.localStorage.setItem('isPanelAdmin', false)
            window.location.reload()
        }

    return (
        <>
            {
                !currentUser ? null : currentUser.is_admin ?
                    <main className="PanelAdmin">
                        <AdminSidebar />
                        <section className="PanelAdminContainer">
                            <AdminHeader />
                            <div className="adminPage">
                                <h3 className="titlePage">{location.pathname.substring(1)}</h3>
                                <Routes />
                            </div>
                        </section>
                    </main> : null
            }
        </>
    )
}

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/dashboard"><AdminDashboard /></Route>
            <Route exact path="/users"><AdminUsers /></Route>
            <Route exact path="/subscriptions"><AdminSubscriptions /></Route>
            <Route exact path="/settings"><AdminSettings /></Route>
            <Redirect from='/admin' to='/dashboard' />
            <Redirect from='/' to='/dashboard' />
        </Switch>
    )
}

export default PanelAdminMain