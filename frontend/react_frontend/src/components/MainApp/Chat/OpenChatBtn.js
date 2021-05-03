import { CancelRounded, Chat, ChatBubbleOutline } from '@material-ui/icons'
import GlobalContext from 'context/GlobalContext'
import { useContext } from 'react'
import './OpenChatBtn.css'

const OpenChatBtn = () => {
    const { showFriends, setShowFriends } = useContext(GlobalContext)

    const handleOpenFriends = () => {
        showFriends ? setShowFriends(false) : setShowFriends(true)
    } 

    return (
        <div className="open-chat-btn" onClick={handleOpenFriends}>
            {
                showFriends ? ( <> <CancelRounded /> &nbsp;&nbsp; Close chats  </> ) :
                ( <> <Chat /> &nbsp;&nbsp; CHATS  </> ) 

            }
            
        </div>
    )
}

export default OpenChatBtn