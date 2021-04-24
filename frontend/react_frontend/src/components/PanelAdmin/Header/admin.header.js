import useUser from 'hooks/useUser'
import './admin.header.css'
import LangPicker from '../LangPicker/admin.langpicker'
import { Badge, IconButton } from '@material-ui/core'
import { NotificationsNoneOutlined } from '@material-ui/icons'

const AdminHeader = () => {

    const { currentUser } = useUser()
    console.log(currentUser);

    return (
        <>
            <header className="adminHeader">
                <GoAppBtn />
                <IconButton aria-label="alerts" style={{marginRight:"20px"}}>
                    <Badge color="secondary" badgeContent={2} showZero >
                        <NotificationsNoneOutlined />
                    </Badge>
                </IconButton>
                <LangPicker />
                {
                    currentUser ? <article className="header_User">
                        <div className="userInfo">
                            <span className="username">{currentUser.username}</span>
                            <span className="type">Admin</span>
                        </div>
                        <img className="img" src={"https://yt3.ggpht.com/ytc/AAUvwniYmZWp4-oL2bneXNmzcr6IErQ_VFMo3HUHh-MW=s900-c-k-c0x00ffffff-no-rj"} />
                    </article> : null
                }

            </header>
        </>
    )
}

const switchToApp = () => {
    window.localStorage.setItem('isPanelAdmin', false)
    window.location.href = "/"
}

const GoAppBtn = () => {
    return (
        <button className="goAppBtn" onClick={switchToApp}>
            GO TO APP
        </button>
    )
}

export default AdminHeader