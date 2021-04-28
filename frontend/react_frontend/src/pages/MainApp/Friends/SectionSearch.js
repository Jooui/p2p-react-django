import { ChatOutlined, FiberManualRecord, KeyboardArrowRightRounded, PublishOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileService from 'services/profile.service';
import './SectionSearch.css'

const SectionSearch = () => {

  let timeout;

  const [searched, setSearched] = useState([]);
  const [username, setUsername] = useState('');

  const typing = (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setUsername(value), 500);
  }

  useEffect(() => {
    if (username !== '') {
      console.log("FETCH SEARCH", username);
      ProfileService.getProfiles(username).then((data) => {
        setSearched(data)
      })
    } else {
      setSearched([])
    }
  }, [username])

  return (
    <div className="sectionSearch">
      <input type="text" name="searchbar_friends" id="searchbar_friends" className="searchbar_friends" placeholder="Search.." onChange={(e) => typing(e.target.value)} />

      <div className="searchUsersWrapper">
        {
          searched !== '' ? searched.map((friend) => {
            return (

              <Link to={"/profile/"+friend.username} className="user-container" key={friend.username + ""}>
                <div className="user-img"></div>
                <span>{friend.username}</span>
                <div className="user-actions">
                  {/* <PublishOutlined className="share-user" />
                  <ChatOutlined className="chat-user" />
                  <FiberManualRecord className="user-status user-status--connected" /> */}
                  <KeyboardArrowRightRounded />
                </div>
                {/* <hr className="user-separator" /> */}
              </Link>
            )
          }) : 
          <span>Type for search friends</span>
        }
      </div>
    </div>
  )
};

export default SectionSearch