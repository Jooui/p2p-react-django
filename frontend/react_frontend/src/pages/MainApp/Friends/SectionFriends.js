import './SectionFriends.css';
import { PublishOutlined, FiberManualRecord, ChatRounded, AccountCircleRounded } from '@material-ui/icons';
import ProfileService from 'services/profile.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SectionFriends = () => {
  const [friends, setFriends] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ProfileService.getFollowingProfiles().then((data) => {
      // Show connected users first
      let sorted = data.sort((x, y) => (x.online === y.online) ? 0 : x.online ? -1 : 1);
      setFriends(sorted)
      setLoading(false)
    })
  }, [])

  return (
    <>
      {!loading ?
        <div className="section-friends-wrapper">
          {
            friends ?
              friends.map((friend) => {
                return (
                  <button className="user-container" key={friend.username + ""}>
                    <div className="user-img"><img src={friend.image} /></div>
                    <span>{friend.username}</span>
                    <div className="user-actions">
                      <FiberManualRecord className={"user-status " + (friend.online ? 'user-status--connected' : '')} />
                    </div>
                    <div className="user-actions-dropdown">
                      <Link to={"/profile/" + friend.username} className="user-action"><PublishOutlined />&nbsp;&nbsp; Send file</Link>
                      <Link to={"/chat/" + friend.username} className="user-action"><ChatRounded />&nbsp;&nbsp; Chat</Link>
                      <Link to={"/profile/" + friend.username} className="user-action"><AccountCircleRounded />&nbsp;&nbsp; Profile</Link>
                    </div>
                  </button>
                )
              }) : null
          }
        </div> : null
      }
    </>

  )
};

export default SectionFriends