import "./MenuTransfer.css"
import svgUpload from '../../../assets/images/menu_choose/upload.svg'
import svgDownload from '../../../assets/images/menu_choose/download.svg'
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { ArrowForwardIos } from "@material-ui/icons"

const MenuTransfer = () => {





    return (
        <section className="menu-transfer-container">
            <section className="create-room-card card-menu-transfer">
                <img src={svgUpload} alt="SVG Para crear sala" />
                <h2>Create a new room</h2>
                <h3>Create a room to send files to your friends</h3>
                <button className="create-room">Create</button>
            </section>

            <section className="join-room-card card-menu-transfer">
                <img src={svgDownload} alt="SVG Para unirse a sala" />
                <h2>Join to room</h2>
                <h3>Join a room to receive the files they send you</h3>
                <div className="join-room-container">
                    <input type="text" placeholder="Room ID" id="join-code"></input>
                    <Link to={"/room/"} ><ArrowForwardIos /></Link>
                </div>
            </section>
        </section>
    )
}

export default MenuTransfer