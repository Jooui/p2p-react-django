import AdminHeader from 'components/PanelAdmin/Header/admin.header'
import AdminSidebar from 'components/PanelAdmin/Sidebar/admin.sidebar'
import './admin.main.css'
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AdminDashboard from './Dashboard/admin.dashboard';
import AdminUsers from './Users/admin.users';
import { useLocation } from 'react-router-dom'
import AdminSubscriptions from './Subscriptions/admin.subscriptions';
import AdminSettings from './Settings/admin.settings';

const PanelAdminMain = () => {

    const location = useLocation();

    return (
        <>
            <main className="PanelAdmin">
                <AdminSidebar />
                <section className="PanelAdminContainer">
                    <AdminHeader />
                    <div className="adminPage">
                        <h3 className="titlePage">{location.pathname.substring(1)}</h3>

                        <Switch>
                            <Route exact path="/dashboard"><AdminDashboard /></Route>
                            <Route exact path="/users"><AdminUsers /></Route>
                            <Route exact path="/subscriptions"><AdminSubscriptions /></Route>
                            <Route exact path="/settings"><AdminSettings /></Route>
                            <Redirect from='/admin' to='/dashboard' />
                            <Redirect from='/' to='/dashboard' />

                        </Switch>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PanelAdminMain