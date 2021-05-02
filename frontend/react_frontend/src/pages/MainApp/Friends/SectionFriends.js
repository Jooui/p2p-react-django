import './SectionFriends.css';
import { PublishOutlined, ChatOutlined, FiberManualRecord, ChatBubbleRounded, ChatRounded, Chat, ChatBubbleOutline, AccountCircleRounded } from '@material-ui/icons';
import ProfileService from 'services/profile.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useUser from 'hooks/useUser';

const SectionFriends = () => {
  const [friends, setFriends] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ProfileService.getFollowingProfiles().then((data) => {
      setFriends(data)
      setLoading(false)
    })
  }, [])

  // Cada minuto y medio se refrescara la información
  // setTimeout(() => {
  //   setInterval(() => {
  //     ProfileService.getFollowingProfiles().then((data) => {
  //       setFriends(data)
  //     })
  //   }, 120000);
  // }, 120000);

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