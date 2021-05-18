import './UserProfile.css'
import { useParams } from "react-router-dom";
// import { Send, People, Archive } from '@material-ui/icons';
import ProfileService from 'services/profile.service';
import { useEffect, useState } from 'react';
import { BlockLoading } from 'react-loadingg';
import useUser from 'hooks/useUser';
import InfoProfile from './InfoProfile';
import EditProfile from './EditProfile';
import { ExitToAppRounded, KeyboardBackspace } from '@material-ui/icons';
import SemipolarLoading from 'react-loadingg/lib/SemipolarLoading';
import useWindowDimensions from 'hooks/useWindowDimensions';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const UserProfile = () => {
    const { currentUser, logout } = useUser();
    const [loading, setLoading] = useState(true);
    const [loadingImg, setLoadingImg] = useState(true);
    const [profile, setProfile] = useState()
    const [section, setSection] = useState('info')
    const { width } = useWindowDimensions();
    let { username } = useParams();

    useEffect(() => {
        setLoading(true)
        ProfileService.getProfile(username).then((data) => {
            if (data) {
                setProfile(data.profile);
                setLoading(false)
            }else{
                window.location.href = '/404'
            }
        })
    }, [username])

    const followUser = () => {
        if (profile.following) {
            setProfile({ ...profile, following: false })
            ProfileService.unfollow(profile.username)
        } else {
            setProfile({ ...profile, following: true })
            ProfileService.follow(profile.username)
        }
    }

    // https://imgur.com/T83ezoh.png   -> Profile image
    return (
        <>
            {
                loading ?
                    <BlockLoading />
                    :
                    <div className="user-profile-container">
                        <div className="user-image">
                            {
                                loadingImg ? <SemipolarLoading /> : null
                            }
                            <img className="image" onLoad={()=>setLoadingImg(false)} src={profile.image ? profile.image : 'https://eu.ui-avatars.com/api/?background=random&name='+profile.username} alt={'user profile imagen'} />
                        </div>
                        {
                            section === 'info' ? 
                                <InfoProfile profile={profile}/> :
                                <EditProfile/>
                        }
                        {
                            currentUser.username === profile.username ?
                                (section === 'info' ? <button className="follow-button" onClick={() => setSection('edit')}>Edit Profile</button> :
                                <button class="backBtnProfile" onClick={() => setSection('info')}><KeyboardBackspace/></button> ):
                                (profile.following ?
                                    <button className="follow-button" onClick={followUser}>Following</button> :
                                    <button className="unfollow-btn" onClick={followUser}>Follow</button>)
                        }
                        {
                            currentUser.username === profile.username ?
                            <button className="logoutBtn" onClick={logout}>{width > 620 ? "Logout" : <ExitToAppRounded />}</button>
                            :null
                        }

                    </div>
            }
        </>

    )
};

export default UserProfile