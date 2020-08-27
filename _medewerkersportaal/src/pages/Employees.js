import React, {useState, useEffect, useContext} from "react"
import axios from 'axios'
import Button from "../components/Button"
import Modal from "../misc/Modal"
import {Context} from "../Context"

function Employees(props) {
    const [isCreateEmployeeModal, setIsCreateEmployeeModal] = useState(false)
    const [isEditEmployeeModal, setIsEditEmployeeModal] = useState(false)
    const [editEmployeeInfo, setEditEmployeeInfo] = useState({id: "", name: "", specialty: "", workDayPart: "", status: ""})
    const [showDropdown, setShowDropdown] = useState({
        active: false,
        id: null
    })
    const [createEmployeeInfo, setCreateEmployeeInfo] = useState({name: "", specialty: "", workDayPart: "", status: ""})
    const { employees, setEmployees, settings } = useContext(Context)

    function createEmployee(e) {
        e.preventDefault()

        // makes a POST call to the api to create an employee
        // only does so if it passes the if statement
        if (createEmployeeInfo.title !== "" && createEmployeeInfo.price !== "" && createEmployeeInfo.type !== "" && createEmployeeInfo.category !== "") {
            axios.post(`${settings.API_URL}/employees/add`, createEmployeeInfo)
                .then(res => console.log(res.data))
                .then(window.location = '/employees')
            }
    }

    function editEmployee(e) {
        e.preventDefault();

        // makes a POST call to the api to edit an employee
        axios.post(`${settings.API_URL}/employees/update/` + editEmployeeInfo.id, editEmployeeInfo)
        .then(res => console.log(res.data));

        window.location = '/employees';
    }

    function deleteEmployee(id) {
        // makes a POST call to the api to delete an employee
        axios.delete(`${settings.API_URL}/employees/` + id)
            .then(response => {
                console.log(response.data)
            })

        setEmployees(prevEmployees => prevEmployees.filter(prev => prev._id !== id))
        setShowDropdown(prev => ({...prev, active: false}))
    }

    const listEmployees = employees.map(employee => (
        <>
            <li>
                <div className="pull-left">
                    {employee.type === "hair" ? <i className="ri-scissors-fill" /> :
                    <i className="fas fa-user-tie" />}
                </div>
                <div className="pull-right">
                    <span>{employee.name} <b>({employee.specialty})</b></span>
                    <p>{employee._id}</p>

                    <i onClick={() => setShowDropdown(prev => ({active: !prev.active, id: employee._id}))} className={showDropdown.id === employee._id && showDropdown.active ? "ri-close-fill" : "ri-more-2-fill"}></i>
                    <ul className={showDropdown.id === employee._id && showDropdown.active ? "active dropdown" : "dropdown"}>
                        <li onClick={() => deleteEmployee(employee._id)}>
                            <span>Remove</span>
                        </li>
                        <li onClick={() => editEmployeeModal(employee._id) + setIsEditEmployeeModal(true)}>
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
            setEditEmployeeInfo(prevEditEmployee => ({...prevEditEmployee, [name]: value}))
        } else if (className === "input-create") {
            console.log(event.target)
            setCreateEmployeeInfo(prevCreateEmployee => ({...prevCreateEmployee, [name]: value}))
        }
    }

    const createEmployeeModal = isCreateEmployeeModal && (
                <Modal disabled={createEmployeeInfo.name === "" || createEmployeeInfo.specialty === "" || createEmployeeInfo.workDayPart === "" || createEmployeeInfo.status === ""} submitEvent={createEmployee} close={() => setIsCreateEmployeeModal(false)}>
                    <h3>New Employee</h3>
                    <div className="group-big">
                        <div className="group">
                            <label>Name</label>
                            <input className="input-create" name="name" value={createEmployeeInfo.name} onChange={handleChange}/>
                        </div>
                    
                        <div className="group">
                            <label>Specialty</label>
                            <select className="input-create" name="specialty" value={createEmployeeInfo.specialty} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="nails">Nails</option>
                                <option value="hair">Hair</option>
                            </select>
                        </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Part of day (working)</label>
                            <select className="input-create" name="workDayPart" value={createEmployeeInfo.workDayPart} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                            </select>
                        </div>
                        <div className="group">
                            <label>Work Status</label>
                            <select className="input-create" name="status" value={createEmployeeInfo.status} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="available">Available</option>
                                <option value="sick">Sick</option>
                            </select>
                        </div>
                    </div>
                </Modal>
            )

        console.log(createEmployeeInfo)

    function editEmployeeModal(id) {
        employees.filter(prev => prev._id === id).map(prev => setEditEmployeeInfo({id: prev._id, name: prev.name, specialty: prev.specialty, workDayPart: prev.workDayPart, status: prev.status}))     
    }

    useEffect(() => {
        props.setActivePage("employees")
    })

    return (
        <>
            {createEmployeeModal}
            
            {isEditEmployeeModal && <Modal disabled={editEmployeeInfo.name === "" || editEmployeeInfo.specialty === "" || editEmployeeInfo.workDayPart === "" || editEmployeeInfo.status === ""} submitEvent={editEmployee} close={() => setIsEditEmployeeModal(false)}>
                <h3>Edit Employee</h3>
                    <div className="group-big">
                        <div className="group">
                            <label>Name</label>
                            <input className="input-edit" name="name" value={editEmployeeInfo.name} onChange={handleChange}/>
                        </div>
                    
                        <div className="group">
                            <label>Specialty</label>
                            <select className="input-edit" name="specialty" value={editEmployeeInfo.specialty} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="nails">Nails</option>
                                <option value="hair">Hair</option>
                            </select>
                        </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Part of day (working)</label>
                            <select className="input-edit" name="workDayPart" value={editEmployeeInfo.workDayPart} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="evening">Evening</option>
                            </select>
                        </div>
                        <div className="group">
                            <label>Work Status</label>
                            <select className="input-edit" name="status" value={editEmployeeInfo.status} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="available">Available</option>
                                <option value="sick">Sick</option>
                            </select>
                        </div>
                    </div>
            </Modal>}

            <div className="list-container-parent">
                <div className="list-container employee-container-1">
                    <h3>All Employees</h3>
                    <Button clickEvent={() => setIsCreateEmployeeModal(true)} width="120px" fontSize="16px" borderRadius={0} background="#3840B1" padding="5px" value="Create New" />
                    <ul className="all-list">
                        {listEmployees}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Employees