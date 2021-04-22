import './SectionFriends.css';
import { PublishOutlined, ChatOutlined, FiberManualRecord } from '@material-ui/icons';

const SectionFriends = () => (
  <div className="section-friends-wrapper">
    <article className="user-container">
      <div className="user-img"></div>
      <span>Tonomollag6</span>
      <div className="user-actions">
        <PublishOutlined className="share-user"/>
        <ChatOutlined className="chat-user"/>
        <FiberManualRecord className="user-status user-status--connected" />
      </div>
    </article>
    <hr className="user-separator"/>
    <article className="user-container">
      <div className="user-img"></div>
      <span>Vicnx</span>
      <div className="user-actions">
        <PublishOutlined className="share-user"/>
        <ChatOutlined className="chat-user"/>
        <FiberManualRecord className="user-status user-status--connected" />
      </div>
    </article>
    <hr className="user-separator"/>
    <article className="user-container">
      <div className="user-img"></div>
      <span>Jrevertvila</span>
      <div className="user-actions">
        <PublishOutlined className="share-user"/>
        <ChatOutlined className="chat-user"/>
        <FiberManualRecord className="user-status user-status--connected" />
      </div>
    </article>
  </div>
);

export default SectionFriends