import React from "react"
import {Link} from "react-router-dom"


function Footer(props) {

    return (
        <footer>
            <Link to="/" className={props.activePage === "home" ? "active footer-item" : "footer-item"}>
                <div>
                    <i className="ri-home-line" />
                    <span>Home</span>
                </div>
            </Link>
            <Link to="/create/appointment" className={props.activePage === "createAppointments" ? "active footer-item" : "footer-item"}>
                <div>
                    <i className="ri-add-box-line" />
                    <span>New</span>
                </div>
            </Link>
            <Link to="/appointments" className={props.activePage === "appointments" ? "active footer-item" : "footer-item"}>
                <div>
                    <i className="ri-calendar-line" />
                    <span>Appointments</span>
                </div>
            </Link>
            <Link to="/settings" className={props.activePage === "settings" ? "active footer-item" : "footer-item"}>
                <div>
                    <i className="ri-tools-line" />
                    <span>Settings</span>
                </div>
            </Link>
        </footer>
    )
}

export default Footer