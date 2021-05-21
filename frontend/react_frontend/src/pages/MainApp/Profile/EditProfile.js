import './EditProfile.css'

const EditProfile = () => {
    return (
        <div className="edit-profile-container">
            <div className="inputEditProfile">
                <label>Email:</label>
                <input type="email" disabled value="jrevertvila@gmail.com" />
            </div>
            <div className="inputEditProfile">
                <label>Username:</label>
                <input type="text" disabled value="jrevertvila" />
            </div>
            <div className="inputEditProfile">
                <label>Name:</label>
                <input type="text" />
            </div>
            <div className="inputEditProfile">
                <label>Surnames:</label>
                <input type="text" />
            </div>
            <button className="saveProfileBtn">
                Save changes
            </button>
        </div>
    )
}

export default EditProfile