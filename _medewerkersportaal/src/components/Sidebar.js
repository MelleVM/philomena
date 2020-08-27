import React from "react"
import { Link } from "react-router-dom";

function Sidebar(props) {

    return(
        <div className="admin-sidebar">
            <ul>
                <li><img alt="logo" src="/images/logo.png" /></li>
                <li className={props.activePage === "home" && "active"}>
                    <Link to="/">
                        <i className="fas fa-home" />
                        <span>Home</span>
                    </Link>
                </li>
                <li className={props.activePage === "users" && "active"}>
                    <Link to="/users">
                        <i className="fas fa-users" />
                        <span>Users</span>
                    </Link>
                </li>
                <li className={props.activePage === "employees" && "active"}>
                    <Link to="/employees">
                        <i className="fas fa-user-tie" />
                        <span>Employees</span>
                    </Link>
                </li>
                <li className={props.activePage === "products" && "active"}>
                    <Link to="/products">
                        <i className="ri-archive-fill" />
                        <span>Products</span>
                    </Link>
                </li>
                <li className={props.activePage === "exceptions" && "active"}>
                    <Link to="/exceptions">
                        <i className="ri-error-warning-fill" />
                        <span>Exceptions</span>
                    </Link>
                </li>
                <li className={props.activePage === "calendar" && "active"}>
                    <Link to="/calendar">
                        <i className="fas fa-calendar-alt" />
                        <span>Schedule</span>
                    </Link>
                </li>
                <li></li>
            </ul>
        </div>
    )
}

export default Sidebar