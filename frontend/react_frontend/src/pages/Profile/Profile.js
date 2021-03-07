import './Profile.css'
import { BackupOutlined, Wallpaper } from '@material-ui/icons';



const Profile = () => {

  return (
    <div className="profile-container">
      <section className="profile-left">
        <h1 className="profile-username-title">Jrevertvila</h1>
        <div class="image-upload">
          <label for="file-input">
            <img src="https://media.licdn.com/dms/image/C4D03AQHgTg56kGYcZQ/profile-displayphoto-shrink_800_800/0/1587724107266?e=1620259200&v=beta&t=Jio2Kl4xsclbx6c9bOReeqSrBiUJQQa7uTv8YSVkKNk" alt="profile" className="profile-img"/>
            <Wallpaper/>
          </label>

          <input id="file-input" type="file" />
        </div>
        {/* <div className="profile-img"></div> */}
        <section className="user-stats">
          <div>
            <span>Total sent:</span>
            {/* <BackupOutlined/> */}
            <span>870.6GB</span>
          </div>
          <div>
            <span>Biggest File:</span>
            {/* <BackupOutlined/> */}
            <span>870.6GB</span>
          </div>
          <div>
            <span>Total sent:</span>
            {/* <BackupOutlined/> */}
            <span>870.6GB</span>
          </div>
        </section>
        <div className="send-friend-request-btn">
          Friend request
        </div>
      </section>
      <section className="profile-right">
        <div className="profile-right__input-container">
          <label>Email:</label>
          <input type="email" disabled value="jrevertvila@gmail.com" />
        </div>
        <div className="profile-right__input-container">
          <label>Username:</label>
          <input type="text" disabled value="jrevertvila" />
        </div>
        <div className="profile-right__input-container">
          <label>Name:</label>
          <input type="email" />
        </div>
        <div className="profile-right__input-container">
          <label>Surnames:</label>
          <input type="email" />
        </div>
        <div className="profile-save-changes-btn">
          Save changes
        </div>
      </section>

    </div>
  )
};

export default Profile