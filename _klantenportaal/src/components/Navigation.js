import React from "react"
import Header from "./navigation/Header"
import Sidebar from "./navigation/Sidebar"
import Footer from "./navigation/Footer"

function Navigation(props) {

    return (
        <div>
            <Header toggleDropdown={props.dropdown.toggle} viewDropdown={props.dropdown.view} toggleSidebar={props.sidebar.toggle} />
            <Sidebar toggleSidebar={props.sidebar.toggle} viewSidebar={props.sidebar.view} />
            <Footer activePage={props.activePage} />
        </div>
    )
}

export default Navigation