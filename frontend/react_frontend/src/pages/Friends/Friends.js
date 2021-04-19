import { useState, useEffect } from 'react';

import './Friends.css'
import { ChatOutlined, PeopleOutlineOutlined, PersonOutlineOutlined, SearchRounded, StarBorderRounded } from '@material-ui/icons';

// Import sections
import SectionFriends from './SectionFriends';
import SectionSearch from './SectionSearch';
import SectionGroups from './SectionGroups';
import SectionFavorites from './SectionFavorites';

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
    default:
      return <SectionFriends />
  }
}

const Friends = () => {
  console.log("ENTRA FRIENDS");
  const [page, setPage] = useState("friends");

  useEffect(() => {

  }, [page])
  return (
    <div className="friends-container">
      <nav>
        <div className="modal-svg">
          <ChatOutlined />
        </div>
        <div className={"friends-nav-item "+(page === "friends" ? 'active':'')} onClick={() => setPage('friends')}>
          <PersonOutlineOutlined />
        </div>
        <div className={"friends-nav-item "+(page === "groups" ? 'active':'')} onClick={() => setPage('groups')}>
          <PeopleOutlineOutlined />
        </div>
        <div className={"friends-nav-item "+(page === "favorites" ? 'active':'')} onClick={() => setPage('favorites')}>
          <StarBorderRounded />
        </div>
        <div className={"friends-nav-item "+(page === "search" ? 'active':'')} onClick={() => setPage('search')}>
          <SearchRounded />
        </div>
      </nav>
      <section className="friends-right">
        <div className="friends-right-title">
          <h1>Users</h1>
          <input type="text" name="searchbar_friends" id="searchbar_friends" className="searchbar_friends" placeholder="Search.." />
        </div>
        <section className="friends-wrapper">
          {/* <SectionFriends /> */}
          {
            // () => {
            //   if (page === "friends") {
            //     return (<SectionFriends />)
            //   } else if (page === "groups") {
            //     return <SectionGroups />
            //   } else if (page === "favorites") {
            //     return <SectionFavorites />
            //   } else if (page === "search") {
            //     return <SectionSearch />
            //   } else {
            //     return <SectionFriends />
            //   }
            // }
            renderPage(page)
            
          }
        </section>

      </section>
    </div>
  )
};

export default Friends