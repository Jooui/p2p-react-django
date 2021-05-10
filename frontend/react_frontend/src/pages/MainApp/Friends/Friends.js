import { useState, useEffect, useContext } from 'react';

import './Friends.css'
import { ChatOutlined, NotificationsActiveOutlined, NotificationsActiveRounded, NotificationsNoneOutlined, PeopleOutlineOutlined, PersonOutlineOutlined, SearchRounded, StarBorderRounded } from '@material-ui/icons';

// Import sections
import SectionFriends from './SectionFriends';
import SectionSearch from './SectionSearch';
import SectionGroups from './SectionGroups';
import SectionFavorites from './SectionFavorites';
import useUser from 'hooks/useUser';
import GlobalContext from 'context/GlobalContext';
import useWindowDimensions from 'hooks/useWindowDimensions';
import SectionNotifications from './Notifications/SectionNotifications';
import { Badge } from '@material-ui/core';

let renderPage = (page) => {
  switch (page) {
    case "friends":
      return <SectionFriends />
    case "groups":
      return <SectionGroups />
    case "favorites":
      return <SectionFavorites />
    case "search":
      return <SectionSearch />
    case "notifications":
      return <SectionNotifications />
    default:
      return <SectionFriends />
  }
}

const Friends = () => {
  const [page, setPage] = useState("friends");
  const { isAuthenticated, currentUser } = useUser()
  const { showFriends, setShowFriends, notifications, countNotifications } = useContext(GlobalContext)
  const { width } = useWindowDimensions();


  useEffect(() => {

  }, [page])
  return (
    <>
      {
        isAuthenticated && currentUser ?
          <div className={"friends-container " + (width < 1250 ? (showFriends ? '' : 'hide') : '')}>
            <nav>
              <div className="modal-svg">
                <ChatOutlined />
              </div>

              <div className={"friends-nav-item " + (page === "friends" ? 'active' : '')} onClick={() => setPage('friends')}>
                <PersonOutlineOutlined />
              </div>

              <div className={"friends-nav-item " + (page === "search" ? 'active' : '')} onClick={() => setPage('search')}>
                <SearchRounded />
              </div>

              <div className={"friends-nav-item " + (page === "notifications" ? 'active' : '')} onClick={() => setPage('notifications')}>
                <Badge color="secondary" badgeContent={countNotifications} >
                  <NotificationsActiveOutlined />
                </Badge>
              </div>
            </nav>
            <section className="friends-right">
              <div className="friends-right-title">
                <h1>Users</h1>
              </div>
              <section className="friends-wrapper">
                {
                  renderPage(page)
                }
              </section>

            </section>
          </div> : null
      }
    </>

  )
};

export default Friends