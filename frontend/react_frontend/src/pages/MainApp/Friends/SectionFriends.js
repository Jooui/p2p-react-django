import './SectionFriends.css';
import { PublishOutlined, ChatOutlined, FiberManualRecord } from '@material-ui/icons';
import ProfileService from 'services/profile.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SectionFriends = () => {

  const [friends, setFriends] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    ProfileService.getFollowingProfiles().then((data) => {
      console.log(data);
      setFriends(data)
      setLoaded(true)
    })
  }, [])

  return (
    <>
      {loaded ?
        <div className="section-friends-wrapper">
          {
            friends.map((friend) => {
              return (

                  <Link to={"/profile/"+friend.username} className="user-container" key={friend.username+""}>
                    <div className="user-img"></div>
                    <span>{friend.username}</span>
                    <div className="user-actions">
                      <PublishOutlined className="share-user" />
                      <ChatOutlined className="chat-user" />
                      <FiberManualRecord className="user-status user-status--connected" />
                    </div>
                    {/* <hr className="user-separator" /> */}
                  </Link>
              )
            })
          }

         
        </div> : null
      }
    </>

  )
};

export default SectionFriends