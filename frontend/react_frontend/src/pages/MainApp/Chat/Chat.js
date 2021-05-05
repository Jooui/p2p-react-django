import { CameraAlt, ChatBubbleOutline, ChatOutlined, CloseRounded, FiberManualRecord, Send } from '@material-ui/icons';
import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import BoxLoading from 'react-loadingg/lib/BoxLoading';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MessageLine from 'components/MainApp/Chat/MessageLine'
import ProfileService from 'services/profile.service';
import './Chat.css'
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useHistory } from 'react-router-dom';

const Chat = ({ params }) => {
    const { socketIo } = useUser()
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState([])
    const [chatsDB, setChatsDB] = useState()
    const [DBLoaded, SetDBLoaded] = useState(false)
    let { username } = useParams();
    const { currentUser, DB } = useUser()
    const [isLoaded, setIsLoaded] = useState(false)
    const [receiver, setReceiver] = useState()
    const { width } = useWindowDimensions()

    const history = useHistory();
    const handleClickClose = () => history.push('/');




    // INDEXEDDB DATABASE 
    if (DB && !DBLoaded) {
        SetDBLoaded(true)
        let transaction = DB.transaction("chats", "readwrite");
        let chats = transaction.objectStore("chats");
        setChatsDB(chats)
    }

    const sendMessage = (message) => {

        let messageObj = {
            sender: currentUser.username,
            receiver: username,
            message: message,
            created: new Date()
        };

        setChat([messageObj, ...chat])

        socketIo.emit('newMsg', messageObj)
        setMsg('')
    }

    const onEnterKeyPress = (event, message) => {
        if (event.charCode === 13) {
            if (message && message != "") sendMessage(message)
        }
    }

    useEffect(() => {
        // console.log(chat);

    }, [chat])

    const pushMsg = (msg) => {
        console.log(chat);
        setChat(chat => ([msg, ...chat]))
    }

    useEffect(() => {
        setChat([])
        ProfileService.getProfile(username).then((data) => {
            setReceiver(data.profile);
        })
    }, [username])


    useEffect(() => {
        if (!isLoaded) {
            socketIo.on('receiveMsg', function (msg) {
                setIsLoaded(true)
                pushMsg(msg)
            });
        }
    }, [])

    return (
        <>
            {
                receiver && currentUser ? <div className={"chat-container " + (width > 678 ? '' : 'fullscreen-comp')}>
                    <div className="chat-header">
                        <ChatOutlined />
                        <span className="chat-username">{receiver.username}</span>
                        <div className="chat-status"><FiberManualRecord className={"user-status " + (receiver.online ? 'user-status--connected' : '')} /></div>
                        {width > 678 ? null : <CloseRounded style={{marginLeft:"auto"}} onClick={handleClickClose}/>}
                        
                    </div>
                    <section className="chat-wrapper" id="chat-wrapper">
                        {
                            chat.map((msg, i) => <MessageLine type={(msg.sender === currentUser.username ? "sender" : "receiver")} msg={msg} key={i} />)
                        }
                    </section>
                    <section className="chat-footer">
                        <div className="camera-btn">
                            <CameraAlt />
                        </div>
                        <input type="text" placeholder="Write a message.." id="chat-input-msg" className="chat-input-msg" onKeyPress={(e) => onEnterKeyPress(e, msg)} onChange={(e) => setMsg(e.target.value)} value={msg} />
                        <div className="send-btn-chat" onClick={() => sendMessage(msg)}>
                            <Send />
                        </div>
                    </section>
                </div> : <BoxLoading />
            }
        </>
    )
}

export default Chat