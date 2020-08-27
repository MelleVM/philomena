import React, {useContext, useEffect} from "react"
import Button from "../components/Button"
import {Context} from "../Context"
import {useHistory} from "react-router-dom"
import AppointmentList from "../components/AppointmentList"
import "moment-timezone";

function Appointments(props) {
    const {getAppointments, setHeaderProps} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        // setting the active page to the current one, to keep the navbar up to date
        props.setActivePage("appointments")

        getAppointments()

        setHeaderProps({
            "height": "250px",
            "borderRadius": "0",
            "children": (
                <>
                    <h2>Appointments</h2> 
                    <h3>Manage your appointments</h3>
                    <Button fontSize="22px" padding="5px 8px" border="1px solid white" clickEvent={() => history.push("/create/appointment")} background="unset" color="white" borderRadius="0 2px 2px 0" value="Make Appointment" width="unset" />
                </>
            )
        })

    }, [])

    return (
        <>
            <ul style={{"height": "100%", "padding-bottom": "250px"}} className="appointments-container">
                <AppointmentList height="100%" />
            </ul>
        </>
    )
}

export default Appointments