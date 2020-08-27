import React, {useState, useEffect, useContext} from "react"
import axios from 'axios'
import Button from "../components/Button"
import Modal from "../misc/Modal"
import {Context} from "../Context"
import moment from "moment"
import "moment-timezone"

function Exceptions(props) {
    const [isCreateExceptionModal, setIsCreateExceptionModal] = useState(false)
    const [isEditExceptionModal, setIsEditExceptionModal] = useState(false)
    const [editExceptionInfo, setEditExceptionInfo] = useState({id: "", dateFrom: "", dateTo: "", title: ""})
    const [createExceptionInfo, setCreateExceptionInfo] = useState({dateFrom: "", dateTo: "", title: ""})
    const [showDropdown, setShowDropdown] = useState({
        active: false,
        id: null
    })
    const {exceptions, setExceptions, appointments, deleteAppointment, settings} = useContext(Context)

    function createException(e) {
        e.preventDefault()
        
        axios.post(`${settings.API_URL}/exceptions/add`, createExceptionInfo)
            .then(res => console.log(res.data))
            .then(window.location = '/exceptions')

        appointments.map(appointment => {
            const exFrom = moment(createExceptionInfo.dateFrom, ("DD-MM-YYYY DD:mm"))
            const exTo = moment(createExceptionInfo.dateTo, ("DD-MM-YYYY DD:mm"))
            
            const appFrom = moment(appointment.fullDate)
            const appTo = moment(appointment.fullDateEnd)

                console.log(exFrom <= appFrom && exTo >= appTo)


            // I'm checking for existing appointments within the timeframe of the 'exception'
            // and then i'm deleting those appointments.
            if (exFrom <= appFrom && exTo >= appTo) {
                deleteAppointment(appointment._id)
            }

            return null
        })
        
    }

    function editException(e) {
        e.preventDefault();

        axios.post(`${settings.API_URL}/exceptions/update/` + editExceptionInfo.id, editExceptionInfo)
        .then(res => console.log(res.data));

        window.location = '/exceptions';

        appointments.map(appointment => {
            // the second parameter of moment() is the 'parse' 
            // it's required if it doesn't have the default date fomat
            const exFrom = moment(editExceptionInfo.dateFrom, ("DD-MM-YYYY DD:mm"))
            const exTo = moment(editExceptionInfo.dateTo, ("DD-MM-YYYY DD:mm"))
            
            const appFrom = moment(appointment.fullDate)
            const appTo = moment(appointment.fullDateEnd)

                console.log(exFrom <= appFrom && exTo >= appTo)


            // I'm checking for existing appointments within the timeframe of the 'exception'
            // and then i'm deleting those appointments.
            if (exFrom <= appFrom && exTo >= appTo) {
                deleteAppointment(appointment._id)
            }

            return null
        })
    }

    function deleteException(id) {
        axios.delete(`${settings.API_URL}/exceptions/` + id)
            .then(response => {
                console.log(response.data)
            })

        setExceptions(prevExceptions => prevExceptions.filter(prev => prev._id !== id))

        setShowDropdown(prev => ({...prev, active: false}))
    }

    const listExceptions = exceptions.map(exception => (
        <>
            <li>
                <div className="pull-left">
                    <i className="ri-error-warning-line" />
                </div>
                <div className="pull-right">
                    <span>{exception.title}</span>
                    <p>{exception.dateFrom} - {exception.dateTo}</p>

                    <i onClick={() => setShowDropdown(prev => ({active: !prev.active, id: exception._id}))} className={showDropdown.id === exception._id && showDropdown.active ? "ri-close-fill" : "ri-more-2-fill"}></i>
                    <ul className={showDropdown.id === exception._id && showDropdown.active ? "active dropdown" : "dropdown"}>
                        <li onClick={() => deleteException(exception._id)}>
                            <span>Remove</span>
                        </li>
                        <li onClick={() => editExceptionModal(exception._id) + setIsEditExceptionModal(true)}>
                            <span>Edit</span> 
                        </li>
                    </ul>
                </div>
            </li> 
        </>
    ))

    function handleChange(event) {
        const {value, name, className} = event.target

        if(className === "input-edit") {
            setEditExceptionInfo(prevEditException => ({...prevEditException, [name]: value}))
        } else if (className === "input-create") {
            console.log(event.target)
            setCreateExceptionInfo(prevCreateException => ({...prevCreateException, [name]: value}))
        }
    }

    const createExceptionModal = isCreateExceptionModal && (
                <Modal disabled={createExceptionInfo.title === "" || createExceptionInfo.price === "" || createExceptionInfo.type === "" || createExceptionInfo.category === ""} submitEvent={createException} close={() => setIsCreateExceptionModal(false)}>
                    <h3>New Exception</h3>
                    <div className="group-big">
                        <div className="group">
                            <label>Date From</label>
                            <input className="input-create" onChange={handleChange} name="dateFrom" value={createExceptionInfo.dateFrom} />
                        </div>
                        <div className="group">
                            <label>Date To</label>
                            <input className="input-create" onChange={handleChange} name="dateTo" value={createExceptionInfo.dateTo} />
                        </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Title</label>
                            <input className="input-create" onChange={handleChange} name="title" value={createExceptionInfo.title} />
                        </div>
                    </div>
                </Modal>
            )

    function editExceptionModal(id) {
        exceptions.filter(prev => prev._id === id).map(prev => setEditExceptionInfo({id: prev._id, title: prev.title, dateFrom: prev.dateFrom, dateTo: prev.dateTo}))     
    }

    useEffect(() => {
        props.setActivePage("exceptions")
    })

    return (
        <>

            {createExceptionModal}
            
            {isEditExceptionModal && <Modal disabled={editExceptionInfo.title === "" || editExceptionInfo.dateFrom === "" || editExceptionInfo.dateTo === ""} submitEvent={editException} close={() => setIsEditExceptionModal(false)}>
                <h3>Edit Exception</h3>
                <div className="group-big">
                    <div className="group">
                        <label>Date From</label>
                        <input className="input-edit" onChange={handleChange} name="dateFrom" value={editExceptionInfo.dateFrom} />
                    </div>
                    <div className="group"> 
                        <label>Date To</label>
                        <input className="input-edit" id="datepicker" onChange={handleChange} name="dateTo" value={editExceptionInfo.dateTo} />
                    </div>
                </div>
                <div className="group-big">
                    <div className="group">
                        <label>Title</label>
                        <input className="input-edit" onChange={handleChange} name="title" value={editExceptionInfo.title} />
                    </div>
                </div>
            </Modal>}

            <div className="list-container-parent">
                <div className="list-container list-container-1">
                    <h3>All Exceptions</h3>
                    <Button clickEvent={() => setIsCreateExceptionModal(true)} width="120px" fontSize="16px" borderRadius={0} background="#3840B1" padding="5px" value="Create New" />
                    <ul className="all-list">
                        {listExceptions}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Exceptions