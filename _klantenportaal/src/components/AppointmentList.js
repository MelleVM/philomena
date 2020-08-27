import React, {useState, useContext} from "react"
import {Context} from "../Context"
import Moment from "react-moment";

import {useHistory} from "react-router-dom"
import Button from "../components/Button"

function AppointmentList() {
    const {appointments, deleteAppointment, userData, products} = useContext(Context)
    const [showDropdown, setShowDropdown] = useState({
        active: false,
        id: null
    })
    const history = useHistory()


    const listAppointments = appointments.filter(appointment => userData.user && appointment.userId === userData.user.id).map(appointment => {
        
        const product = products.find(product => product._id === appointment.productId )

        return (
            <li>
                <div className="pull-left">
                    <i className={product.type === "hair" ? "ri-scissors-fill ri-2x" : "fas fa-highlighter"} />
                </div>
                <div className="pull-right">
                    <span><Moment date={appointment.date} parse="DD-MM-YYYY" format="dddd Do MMMM" /></span>
                    <p>{appointment.timeFrom} - {appointment.timeTo}</p>
                    <i onClick={() => setShowDropdown(prev => ({active: !prev.active, id: appointment._id}))} className={showDropdown.id === appointment._id && showDropdown.active ? "ri-close-fill" : "ri-more-2-fill"} />

                    <ul className={showDropdown.id === appointment._id && showDropdown.active ? "active dropdown" : "dropdown"}>
                        <li onClick={() => deleteAppointment(appointment._id, appointment.fullDate, appointment.timeFrom)}><span>Cancel</span></li>
                    </ul>
                </div>
            </li>
        )
    }
    )

    const allAppointments = listAppointments.length > 0 && userData.user ? listAppointments : (
        <div className="appointments-none">
            <h2>No Appointments</h2>
            <Button fontSize="20px" clickEvent={() => history.push("/create/appointment")} background="#1e38a3" color="white" borderRadius={0} value="Make Appointment" width="unset" />
        </div>
    )

    return allAppointments   
}

export default AppointmentList