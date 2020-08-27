import React, { useEffect, useContext } from "react"
import moment from "moment";
import { Context } from "../Context"

function Users(props) {
    const { exceptions, employees, users, appointments, products } = useContext(Context)

    const sickEmployees = employees.filter(employee => employee.status === "sick")
    const activeException = exceptions.map(exception => {
    const active = moment(exception.dateFrom, "DD-MM-YYYY HH:mm") < moment() && moment(exception.dateTo, "DD-MM-YYYY HH:mm") > moment()


        // using ? + : instead of a regular if statement
        return active ? (
            <div className="exceptions-section warning">
                <div className="pull-left">
                    <i className="ri-error-warning-fill" />
                </div>
                <div className="pull-right">
                    <div><span>{exception.title}</span> - All appointments are currently disabled</div>
                </div>
            </div>
        ) : (
            <div className="exceptions-section">
                <div className="pull-left">
                        <i className="ri-shield-check-fill" />
                </div>
                <div className="pull-right">
                    <div>All appointments are currently enabled</div>
                </div>
            </div>
        )
    })

    const listAppointments = appointments.map(appointment => {
        const getProductTitle = products.filter(prod => prod._id === appointment.productId).map(prod => {
            return prod.type
        })

        return {
            Id: appointment._id,
            Subject: getProductTitle,
            StartTime: appointment.fullDate,
            EndTime: appointment.fullDateEnd
        }
    })


    useEffect(() => {
        props.setActivePage("home")
    })

    return (
        <>
            <div className="home-sections">
                <div className="home-section employees">
                    <div className="wrapper">
                        <h5>Total Employees</h5>
                        <h1>{employees.length}</h1>
                    </div>
                    <div className="bottom">
                        SICK EMPLOYEES: {sickEmployees.length}
                    </div>
                </div>

                <div className="home-section users">
                    <div className="wrapper">
                        <h5>Total Users</h5>
                        <h1>{users.length}</h1>
                    </div>
                    <div className="bottom">
                    </div>
                </div>
            </div>

            {activeException}

            <div className="calendar-section">
                {/* displaying the calendar from react-schedule */}
                <props.schedule.ScheduleComponent height='650px' readonly={true} selectedDate={moment()} eventSettings={{ dataSource: listAppointments }}>
                    <props.schedule.Inject services={[props.schedule.Day, props.schedule.Week, props.schedule.WorkWeek, props.schedule.Month, props.schedule.Agenda]}/>
                </props.schedule.ScheduleComponent>
            </div> 
        </>
    )
}

export default Users