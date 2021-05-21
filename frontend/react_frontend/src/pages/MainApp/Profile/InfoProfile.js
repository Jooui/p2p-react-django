import { Send, People, SupervisorAccount } from '@material-ui/icons';
import { useState } from "react";



const InfoProfile = (profile) => {
    const [myprofile] = useState(profile.profile)

    return (
        <>
        {profile ? 
        <section className="user-info-container">
            <div>
                <span className="username_title">{myprofile.username}</span>
                <p className="user_bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod tempor.</p>
                <div className="user_stats">
                    <article className="stat">
                        <Send />
                        <label>Max. Sent:</label>
                        <span>12GB</span>
                    </article>
                    <article className="stat">
                        <SupervisorAccount />
                        <label>Following:</label>
                        <span>27GB</span>
                    </article>
                    <article className="stat">
                        <People />
                        <label>Followers:</label>
                        <span>{myprofile.followersCount}</span>
                    </article>
                </div>
            </div>
        </section> 
        : null}
        </>
        
    )
}


export default InfoProfile