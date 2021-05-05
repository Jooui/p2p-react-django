import useUser from 'hooks/useUser'
import './admin.header.css'
import LangPicker from '../LangPicker/admin.langpicker'
import { Badge, IconButton } from '@material-ui/core'
import { MenuRounded, NotificationsNoneOutlined } from '@material-ui/icons'
import GlobalContext from 'context/GlobalContext'
import { useContext } from 'react'
import useWindowDimensions from 'hooks/useWindowDimensions'

const AdminHeader = () => {

    const { showSidebarAdmin, setShowSidebarAdmin } = useContext(GlobalContext)
    const { currentUser } = useUser()
    const { width } = useWindowDimensions()
    return (
        <>
            <header className="adminHeader">
                <MenuRounded className="menu-btn" onClick={() => showSidebarAdmin ? setShowSidebarAdmin(false) : setShowSidebarAdmin(true)} />
                {width > 1200 ? <GoAppBtn /> : null}
                <IconButton aria-label="alerts" style={{ marginRight: "20px" }}>
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