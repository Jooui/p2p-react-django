import './NotFound.css'
import nofFoundImg from '../../../assets/images/notfound.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const NotFound = () => {
    return (
        <div className="not_found_page">
            <section className="left">
                <span className="title">Whooos!</span>
                <span className="subtitle">Looks like this page doesn't exists!</span>
            </section>
            <Link to="/" className="backHome">Home</Link>
            <img src={nofFoundImg} className="notFoundImage" alt="aa"/>
        </div>
    )
}

export default NotFound