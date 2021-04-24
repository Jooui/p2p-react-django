import './SectionFriends.css';
import { PublishOutlined, ChatOutlined, FiberManualRecord } from '@material-ui/icons';
import ProfileService from 'services/profile.service';
import { useEffect, useState } from 'react';

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

                  <article className="user-container" key={friend.username+""}>
                    <div className="user-img"></div>
                    <span>{friend.username}</span>
                    <div className="user-actions">
                      <PublishOutlined className="share-user" />
                      <ChatOutlined className="chat-user" />
                      <FiberManualRecord className="user-status user-status--connected" />
                    </div>
                    {/* <hr className="user-separator" /> */}
                  </article>
              )
            })
          }

         
        </div> : null
      }
    </>

  )
};

export default SectionFriends