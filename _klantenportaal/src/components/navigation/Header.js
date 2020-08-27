import React, {useContext} from "react"
import {Context} from "../../Context"
import SectionTop from "../SectionTop"
import { Link } from "react-router-dom";


function Header(props) {
    const {headerProps} = useContext(Context)
    const { userData, setUserData } = useContext(Context);
    
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
    };


    return (
        <>
            <SectionTop style={headerProps}>
                {headerProps.children}
            </SectionTop>
            <header >
                <div className="burger" onClick={props.toggleSidebar}>
                    <i className="ri-menu-2-fill" />
                </div>
                <div className="settings-icon" onClick={props.toggleDropdown}>
                    <i className="ri-more-2-fill" />
                </div>
                <ul className={props.viewDropdown ? "dropdown active" : "dropdown"}>
                    <li><Link to="/settings">Settings</Link></li>
                    {userData.user && (
                    <li onClick={logout}><span>Logout</span></li>
                    )}
                </ul>
            </header>
        </>
    )
}

export default Header