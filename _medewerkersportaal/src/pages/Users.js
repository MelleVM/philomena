import React, {useState, useEffect, useContext} from "react"
import axios from 'axios'
import Button from "../components/Button"
import Modal from "../misc/Modal"
import {Context} from "../Context"

function Users(props) {
    const [isCreateUserModal, setIsCreateUserModal] = useState(false)
    const [isEditUserModal, setIsEditUserModal] = useState(false)
    const [editUserInfo, setEditUserInfo] = useState({id: "", displayName: "", email: "", password: ""})
    const [showDropdown, setShowDropdown] = useState({
        active: false,
        id: null
    })
    const [createUserInfo, setCreateUserInfo] = useState({displayName: "", email: "", password: ""})
    const { users, setUsers, settings } = useContext(Context)

    function createUser(e) {
        e.preventDefault()

        if(createUserInfo.displayName !== "" && createUserInfo.email !== "" && createUserInfo.password !== "") {
            // makes an api call to create a user
            axios.post(`${settings.API_URL}/users/add`, createUserInfo)
                .then(res => console.log(res.data))
                .then(window.location = '/users')
            }
    }

    function editUser(e) {
        e.preventDefault();

        // makes an api call to edit a user
        axios.post(`${settings.API_URL}/users/update/` + editUserInfo.id, editUserInfo)
        .then(res => console.log(res.data));

        window.location = '/users';
    }

    function deleteUser(id) {
        
        // makes an api call to delete a user
        axios.delete(`${settings.API_URL}/users/` + id)
            .then(response => {
                console.log(response.data)
            })

        setUsers(prevUsers => prevUsers.filter(prev => prev._id !== id))
    }

    const listUsers = users.map(user => (
        <>
            <li>
                <div className="pull-left">
                    <i className="ri-file-user-fill ri-2x" />
                </div>
                <div className="pull-right">
                    <span>{user.email}</span>
                    <p>{user._id}</p>

                    <i onClick={() => setShowDropdown(prev => ({active: !prev.active, id: user._id}))} className={showDropdown.id === user._id && showDropdown.active ? "ri-close-fill" : "ri-more-2-fill"}></i>
                    <ul className={showDropdown.id === user._id && showDropdown.active ? "active dropdown" : "dropdown"}>
                        <li onClick={() => deleteUser(user._id)}>
                            <span>Remove</span>
                        </li>
                        <li onClick={() => editUserModal(user._id) + setIsEditUserModal(true)}>
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
            setEditUserInfo(prevEditUser => ({...prevEditUser, [name]: value}))
        } else if (className === "input-create") {
            console.log(event.target)
            setCreateUserInfo(prevCreateUser => ({...prevCreateUser, [name]: value}))
        }
    }

    const createUserModal = isCreateUserModal && (
                <Modal disabled={createUserInfo.email === "" || createUserInfo.password === ""} submitEvent={createUser} close={() => setIsCreateUserModal(false)}>
                    <h3>New User</h3>
                        <div className="group-big">
                        <div className="group">
                            <label>Email</label>
                            <input className="input-create" name="email" value={createUserInfo.email} onChange={handleChange}/>
                        </div>
                    
                        <div className="group">
                            <label>Displayname (optional)</label>
                            <input className="input-create" name="displayName" value={createUserInfo.displayName} onChange={handleChange}/>
                        </div>
                        </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Password</label>
                            <input className="input-create" name="password" value={createUserInfo.password} onChange={handleChange}/>
                        </div>
                    </div>
                </Modal>
            )

    function editUserModal(id) {
        users.filter(prev => prev._id === id).map(prev => setEditUserInfo({id: prev._id, displayName: prev.displayName, email: prev.email, password: ""}))     
    }

    useEffect(() => {
        props.setActivePage("users")
    })

    return (
        <>
            {createUserModal}
            
            {isEditUserModal && <Modal disabled={editUserInfo.email === ""} submitEvent={editUser} close={() => setIsEditUserModal(false)}>
                <h3>Edit User</h3>
                    <div className="group-big">
                        <div className="group">
                            <label>Email</label>
                            <input className="input-edit" name="email" value={editUserInfo.email} onChange={handleChange}/>
                        </div>
                    
                        <div className="group">
                            <label>Displayname (optional)</label>
                            <input className="input-edit" name="displayName" value={editUserInfo.displayName} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Password</label>
                            <input placeholder="Leave empty to keep the same" className="input-edit" name="password" value={editUserInfo.password} onChange={handleChange}/>
                        </div>
                    </div>
            </Modal>}

            <div className="list-container-parent">
                <div className="list-container user-container-1">
                    <h3>All Users</h3>
                    <Button clickEvent={() => setIsCreateUserModal(true)} width="120px" fontSize="16px" borderRadius={0} background="#3840B1" padding="5px" value="Create New" />
                    <ul className="all-list">
                        {listUsers}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Users