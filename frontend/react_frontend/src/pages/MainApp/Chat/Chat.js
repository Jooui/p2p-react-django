import { CameraAlt, ChatBubbleOutline, ChatOutlined, FiberManualRecord, Send } from '@material-ui/icons';
import useUser from 'hooks/useUser';
import './Chat.css'

const Chat = ({params}) => {
    const {socketIo} = useUser()
    console.log(socketIo);
    console.log(params);
    
    return (
        <div className="chat-container">
            <div className="chat-header">
                <ChatOutlined />
                <span className="chat-username">jrevertvila</span>
                <div className="chat-status">Status:&nbsp; <span>Connected</span> <FiberManualRecord className={"user-status user-status--connected"} /></div>
            </div>
            <section className="chat-wrapper">
                <article className="message sender">
                    <p>
                    It is a long established fact that a reader
                    </p>
                    <span className="msg-time">12:58</span>
                </article>
                <article className="message receiver">
                    <p>
                    readable content of a pag
                    </p>
                    <span className="msg-time">12:59</span>
                </article>
                <article className="message sender">
                    <p>
                    Lorem Ipsum is that
                    </p>
                    <span className="msg-time">13:00</span>
                </article>
                <article className="message sender">
                    <p>
                    Lorem 
                    </p>
                    <span className="msg-time">13:00</span>
                </article>
                <article className="message sender">
                    <p>
                    Lorem Ipsum is that
                    </p>
                    <span className="msg-time">13:00</span>
                </article>
            </section>
            <section className="chat-footer">
                <div className="camera-btn">
                    <CameraAlt />
                </div>
                <input type="text" placeholder="Write a message.." id="chat-input-msg" className="chat-input-msg" />
                <div className="send-btn-chat">
                    <Send />
                </div>
            </section>
        </div>

    )
}

export default Chat