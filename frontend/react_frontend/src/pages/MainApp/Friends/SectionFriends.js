import './SectionFriends.css';
import { PublishOutlined, ChatOutlined, FiberManualRecord } from '@material-ui/icons';
import ProfileService from 'services/profile.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useUser from 'hooks/useUser';

const SectionFriends = () => {
  const [friends, setFriends] = useState()
  const [loading, setLoading] = useState(true)
  console.log(friends);

  useEffect(() => {
    ProfileService.getFollowingProfiles().then((data) => {
      setFriends(data)
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

                  <Link to={"/profile/" + friend.username} className="user-container" key={friend.username + ""}>
                    <div className="user-img"></div>
                    <span>{friend.username}</span>
                    <div className="user-actions">
                      <PublishOutlined className="share-user" />
                      <ChatOutlined className="chat-user" />
                      <FiberManualRecord className={"user-status " + (friend.online ? 'user-status--connected' : '')} />
                    </div>
                    {/* <hr className="user-separator" /> */}
                  </Link>
                )
              }) : null
          }


        </div> : null
      }
    </>

  )
};

export default SectionFriends