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
import useUser from 'hooks/useUser';

const PanelAdminMain = () => {
    const { currentUser } = useUser()
    // const [loading, setLoading] = useState(true)
    const location = useLocation();
    console.log(currentUser);
    if (currentUser) {
        if (!currentUser.is_admin) {
            window.localStorage.setItem('isPanelAdmin', false)
            window.location.reload()
        }
    }

    return (
        <>
            {
                !currentUser ? null :
                    currentUser.is_admin ?
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
                        : null
            }
        </>
    )
}

export default PanelAdminMain