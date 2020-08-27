import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {Context} from "../../Context"


function Sidebar(props) {
    const { userData } = useContext(Context);

    return (
        <div className={props.viewSidebar ? "sidebar active" : "sidebar"} >
            <div className="logo">
                <img alt="logo" src="/images/logo.png" height="100%" />
                <h2>Philomena</h2>
                <h3>Nails & Hair</h3> 
            </div>
            <ul>
                <li>
                    <Link to="/" onClick={props.toggleSidebar} >
                        <div className="pull-left"><i className="fas fa-home" /></div>
                        <div className="pull-right">Home Page</div>      
                    </Link>
                </li>
                <li>
                    <Link to="/create/appointment" onClick={props.toggleSidebar} >
                        <div className="pull-left"><i className="far fa-calendar-plus" /></div>
                        <div className="pull-right">New Appointment</div>      
                    </Link>
                </li>
                <li>
                    <Link to="/appointments" onClick={props.toggleSidebar}>
                        <div className="pull-left"><i className="fas fa-calendar-alt" /></div>
                        <div className="pull-right">Appointments</div>
                    </Link>
                </li>
                {!userData.user && (
                    <>
                        <li>
                            <Link to="/login" onClick={props.toggleSidebar}>
                                <div className="pull-left"><i className="fas fa-sign-in-alt" /></div>
                                <div className="pull-right">Login</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" onClick={props.toggleSidebar}>
                                <div className="pull-left"><i className="fas fa-user-plus" /></div>
                                <div className="pull-right">Register</div>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>    
    )
}

export default Sidebar