import React, {useContext, useEffect} from "react"
import {Context} from "../Context"
import moment from "moment";

function Calendar(props) {
    const {appointments, products} = useContext(Context)
    

    const listAppointments = appointments.map(appointment => {
        const getProductTitle = products.filter(prod => prod._id === appointment.productId).map(prod => {
            return prod.type
        })

        // inserting the data in the calendar (when it's called by ScheduleComponent)
        return {
            Id: appointment._id,
            Subject: getProductTitle,
            StartTime: appointment.fullDate,
            EndTime: appointment.fullDateEnd
        }
    })

    useEffect(() => {
        props.setActivePage("calendar")
    })

    return (
        <div>
            {/* Displaying the Calendar with react-schedule */}
                <props.schedule.ScheduleComponent height='650px' readonly={true} selectedDate={moment()} eventSettings={{ dataSource: listAppointments }}>
                    <props.schedule.Inject services={[props.schedule.Day, props.schedule.Week, props.schedule.WorkWeek, props.schedule.Month, props.schedule.Agenda]}/>
                </props.schedule.ScheduleComponent>
        </div>
    )
}

export default Calendar