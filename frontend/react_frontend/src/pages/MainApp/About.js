import useUser from 'hooks/useUser'


const About = () => {
    const { socketIo } = useUser()
    console.log(socketIo)

    return (
        <div>
            <h2>About</h2>
        </div>
    )
};

export default About