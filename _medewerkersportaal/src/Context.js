import React, {useState, useEffect} from "react"
import axios from 'axios'

const Context = React.createContext() 

// Importing settings from .env
const settings = {API_URL: process.env.REACT_APP_API_URL} 

function ContextProvider(props) {
    const [appointments, setAppointments] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [employees, setEmployees] = useState([])
    const [exceptions, setExceptions] = useState([])
    const [headerProps, setHeaderProps] = useState({"height": "200px", "children": ""})
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    function getProducts() {
        axios.get(`${settings.API_URL}/products/`)
            .then(response => {
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

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

    function getUsers() {
        axios.get(`${settings.API_URL}/users/all`)
            .then(response => {
                setUsers(response.data)
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
            .then(window.location = '/appointments')
    }

    function deleteAppointment(id) {
        axios.delete(`${settings.API_URL}/appointments/` + id)
            .then(response => {
                console.log(response.data)
            })

        setAppointments(prevAppointments => prevAppointments.filter(prev => prev._id !== id))
    }

    useEffect(() => {
        getAppointments()
        getProducts()
        getUsers()
        getEmployees()
        getExceptions()
    }, [])

    return (
        <Context.Provider value = {
            {
                appointments,
                createAppointment,
                deleteAppointment,
                headerProps,
                setHeaderProps,
                userData,
                setUserData,
                products,
                setProducts,
                users,
                setUsers,
                employees,
                setEmployees,
                exceptions,
                setExceptions,
                settings
            }
        } >
            {/* rendering props.children to display the app  */}
            {props.children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}