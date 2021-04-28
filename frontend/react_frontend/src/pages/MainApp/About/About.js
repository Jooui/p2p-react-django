import useUser from 'hooks/useUser'
import './About.css'

const About = () => {
    const { socketIo } = useUser()
    console.log(socketIo)

    return (
        <div className="about-page">
            <h2>About</h2>
        </div>
    )
};

export default About