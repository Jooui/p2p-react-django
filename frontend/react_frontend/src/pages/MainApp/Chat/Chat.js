import { CameraAlt, ChatBubbleOutline, ChatOutlined, FiberManualRecord, Send } from '@material-ui/icons';
import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import BoxLoading from 'react-loadingg/lib/BoxLoading';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MessageLine from 'components/MainApp/Chat/MessageLine'
import ProfileService from 'services/profile.service';
import './Chat.css'

const chatTest = [
    {
        sender: "admin",
        receiver: "joelrevert",
        message: "It is a long established fact that a reader",
        created: new Date()
    },
    {
        sender: "joelrevert",
        receiver: "admin",
        message: "readable content of a pag",
        created: new Date()
    },
    {
        sender: "admin",
        receiver: "joelrevert",
        message: "Lorem Ipsum is that",
        created: new Date()
    },
    {
        sender: "admin",
        receiver: "joelrevert",
        message: "Lorem",
        created: new Date()
    },
    {
        sender: "admin",
        receiver: "joelrevert",
        message: "Lorem Ipsum is that",
        created: new Date()
    }
]

const Chat = ({ params }) => {
    const { socketIo } = useUser()
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState(chatTest)
    const [chatsDB, setChatsDB] = useState()
    const [DBLoaded, SetDBLoaded] = useState(false)
    let { username } = useParams();
    const { currentUser, DB } = useUser()
    const [isLoaded, setIsLoaded] = useState(false)
    const [receiver, setReceiver] = useState()
    // const chatWrapper = document.getElementById('chat-wrapper')

    
    

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

        setChat([messageObj,...chat])

        socketIo.emit('newMsg', { sender: currentUser.username, receiver: username, data:messageObj })
        setMsg('')
    }

    const onEnterKeyPress = (event, message) => {
        if (event.charCode === 13) {
            if (message && message != "") sendMessage(message)
        }
    }

    useEffect(() => {
        console.log(chat);

    }, [chat])

    const pushMsg = (msg) => {
        console.log(chat);
        setChat([msg,...chat])
    }


    useEffect(() => {
        ProfileService.getProfile(username).then((data) => {
            setReceiver(data.profile);
        })

        socketIo.on('receiveMsg', function(msg) {
            console.log(msg);
            // document.getElementById("chat-wrapper").appendChild(<MessageLine type={(msg.sender === currentUser.username ? "sender" : "receiver")} msg={msg}  />)
            pushMsg(msg)
        });
    }, [])

    return (
        <>
        {
            receiver && currentUser ? <div className="chat-container">
            <div className="chat-header">
                <ChatOutlined />
                <span className="chat-username">{receiver.username}</span>
                <div className="chat-status">Status:&nbsp; <span>Connected</span> <FiberManualRecord className={"user-status user-status--connected"} /></div>
            </div>
            <section className="chat-wrapper" id="chat-wrapper">
                {
                    // chat.map((msg, i)=> 
                    // <article className={"message "+(msg.sender === currentUser.username ? "sender" : "receiver")} key={i}>
                    //     <p>
                    //         {msg.message}
                    //     </p>
                    //     <span className="msg-time">12:58</span>
                    // </article>
                    // )
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