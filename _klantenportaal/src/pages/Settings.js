import React, {useEffect, useState, useContext} from "react"
import Button from "../components/Button"
import {Context} from "../Context"
import {useHistory} from "react-router-dom"
import axios from 'axios'

function Settings(props) {
    const {setHeaderProps, settings, userData} = useContext(Context)
    const [editUserInfo, setEditUserInfo] = useState({id: "", displayName: "", email: "", password: ""})
    const history = useHistory()


    function editUser(e) {
        e.preventDefault();

        axios.post(`${settings.API_URL}/users/update/` + userData.user.id, editUserInfo)
            .then(res => console.log(res.data));

        window.location = '/users';
    }

    function handleChange(event) {
        const {value, name} = event.target
        setEditUserInfo(prevEditUser => ({...prevEditUser, [name]: value}))
    }

    useEffect(() => {
        if (userData.user) {
            setEditUserInfo({id: userData.user.id, displayName: userData.user.displayName, email: userData.user.email, password: ""})
        }

        setHeaderProps({
            "height": "82px",
            "borderRadius": "0"
        })

        props.setActivePage("settings")
    }, [])


    return (
        <>
        {/* Making sure it only displays this JSX if the user is logged in. */}
        {userData.user ? (
        <div className="settings-container">
            <h3>USER SETTINGS</h3>
            <form onSubmit={editUser}>
                <div className="group">
                    <label>Displayname</label>
                    <input name="displayName" onChange={handleChange} value={editUserInfo.displayName} />
                </div>
                <div className="group">
                    <label>Email Adress</label>
                    <input name="email" onChange={handleChange} value={editUserInfo.email} />
                </div>
                <div className="group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="Leave empty to keep the same" value={editUserInfo.password} />
                </div>
                <Button width = "150px"
                value="Save"
                padding="10px"
                fontSize="16px"
                borderRadius="0"
                disabled={editUserInfo.email === ""}
                />
            </form>
        </div>
        ) : ( 
            <div className="need-auth-container active">
                <div className="need-auth-wrapper">
                    <h4>In order to access the settings</h4>
                    <Button
                        clickEvent={() => history.push("/register")}
                        background="#3840B1"
                        color="white"
                        borderRadius={0}
                        value="Sign up"
                        fontSize = "22px"
                    />
                    <h5>Or</h5>
                    <Button
                        clickEvent={() => history.push("/login")}
                        background="#3840B1"
                        color="white"
                        borderRadius={0}
                        value="Sign in"
                        fontSize="22px"
                    />
                </div>
            </div>
        )}
        </>
    )
}

export default Settings