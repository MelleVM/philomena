import React, {useState, useEffect} from "react"
import axios from 'axios'
import moment from "moment";
import "moment-timezone";
import Notification from "react-web-notification";
import {toast} from 'react-toastify';

const Context = React.createContext() 

// retreiving info from the .env file
const settings = {API_URL: process.env.REACT_APP_API_URL} 


function ContextProvider(props) {
    const [appointments, setAppointments] = useState([])
    const [products, setProducts] = useState([])
    const [employees, setEmployees] = useState([])
    const [exceptions, setExceptions] = useState([])
    const [headerProps, setHeaderProps] = useState({"height": "200px", "children": ""})
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
    const [notificationTitle, setNotificationTitle] = useState("");

    // on-screen notifications
    const notify = (type, message) => toast(message, {
        position: "top-right", 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: type
    });

    function getAppointments() {
        axios.get(`${settings.API_URL}/appointments/`)
            .then(response => {
                setAppointments(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getProducts() {
        axios.get(`${settings.API_URL}/products/`)
            .then(response => {
                setProducts(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getEmployees() {
        axios.get(`${settings.API_URL}/employees/`)
            .then(response => {
                setEmployees(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getExceptions() {
        axios.get(`${settings.API_URL}/exceptions/`)
            .then(response => {
                setExceptions(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function createAppointment(appointment, history) {
        axios.post(`${settings.API_URL}/appointments/add`, appointment)
            .then(res => console.log(res.data))
            .then(history.push('/appointments'))
    }

    function deleteAppointment(id, date) {
        console.log(moment().diff(moment(date), "hour"))

        // Comparing the difference between "moment()" which is the current date
        // and the parameter "date", to make sure that the appointment can only
        // be cancelled if the difference is bigger than 24 hours.
        if (moment().diff(moment(date), "hour") <= -24) {
            axios.delete(`${settings.API_URL}/appointments/` + id)
                .then(response => {
                    console.log(response.data)
                })

            setAppointments(prevAppointments => prevAppointments.filter(prev => prev._id !== id))
            notify("success", "Appointment succesfully cancelled!")
        } else {
            notify("error", "Sorry! too late to cancel")
        }
    }
    
    useEffect(() => {
        // getting all the info from MongoDB by calling the api call functions
        getAppointments()
        getExceptions()
        getProducts()
    }, [])


    return (
        <Context.Provider value = {
            {
                getAppointments,
                appointments,
                createAppointment,
                deleteAppointment,
                getEmployees,
                employees,
                exceptions,
                headerProps,
                setHeaderProps,
                userData,
                setUserData,
                notificationTitle,
                setNotificationTitle,
                notify,
                products,
                settings
            }
        }>
        {props.children}
        {/* Notification system using react-web-notifications */}
        {notificationTitle ? (  
            <Notification
                title={notificationTitle}
                options={{
                    icon:
                    "/images/logo.png"
                }}
                onClose={() => setNotificationTitle(undefined)}
            />  
        ) : null}  
        </Context.Provider>
    )
}

export {Context, ContextProvider}