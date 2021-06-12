import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserAdmin = () => {

    const [users, setUsers] = useState([])

    // State for adding user
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()

    // State for updating user
    const [userId, setUserId] = useState()
    const [usernameUpdate, setUsernameUpdate] = useState()
    const [emailUpdate, setEmailUpdate] = useState()
    const [ageUpdate, setAgeUpdate] = useState()
    const [addressUpdate, setAddressUpdate] = useState()
    const [roleUpdate, setRoleUpdate] = useState()
    const [imageUpdate, setImageUpdate] = useState()


    const [deleted, setDeleted] = useState(false)


    // Get all the users
    useEffect(() => {
        const loadUsers = async () => {
            const usersResponse = await axios.get('http://localhost:5000/api/users/retrieve')
            const sortedUsersResponse = usersResponse.data.data.reverse()
            setUsers(sortedUsersResponse)
        }
        loadUsers()
    }, [username, usernameUpdate, deleted])

    const togglePopup = () => {
        document.getElementById("popup-1").classList.toggle("active");
    }


    const togglePopupUpdate = (user) => {
        document.getElementById("popup-2").classList.toggle("active");


        setUserId(user._id)
        setUsernameUpdate(user.username)
        setEmailUpdate(user.email)
        setAddressUpdate(user.address)
        setAgeUpdate(user.age)
        setRoleUpdate(user.role)
        setImageUpdate(user.image)

    }

    // Adding User
    const onUserSubmit = async (e) => {
        e.preventDefault()

        try {
            const newUser = { username, email, password, role }
            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:5000/api/users/register", newUser,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("New user has been added.")

            setUsername("")
            setEmail("")
            setPassword("")

        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    // Deleting User
    const onUserDelete = async (id) => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.delete("http://localhost:5000/api/users/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("User has been deleted.")
            setDeleted(prevValue => !prevValue)
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    // Updating User
    const onUserUpdate = async (e) => {
        e.preventDefault()

        try {
            const updateUser = new FormData() // new line
            updateUser.append('username', usernameUpdate)
            updateUser.append('email', emailUpdate)
            updateUser.append('age', ageUpdate)
            updateUser.append('address', addressUpdate)
            updateUser.append('image', imageUpdate)
            updateUser.append('role', roleUpdate)
            
            // const updateUser = {
            //     username: usernameUpdate,
            //     email: emailUpdate,
            //     role: roleUpdate,
            //     age: ageUpdate,
            //     address: addressUpdate
            // }
            
            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:5000/api/users/update/" + userId, updateUser,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("User has been updated.")
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    return (
        <div className="admin-table-div">

            <button onClick={togglePopup}>Add User</button>

            <div style={{ overflowX: "auto" }}>
                <table id="customers-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.age}</td>
                                    <td>{user.address}</td>
                                    <td ><img height="100" src={`http://localhost:5000/uploads/${user.image.split("\\")[1]}`} alt="" /></td>
                                    <td>
                                        <Link onClick={() => togglePopupUpdate(user)} style={{ color: "blue" }}>edit </Link>|
                                        <Link style={{ color: "red" }}
                                            onClick={() => {
                                                if (window.confirm('Are you sure you wish to delete this user?')) {
                                                    onUserDelete(user._id)
                                                }
                                            }}
                                        > delete</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            {/* add Modal */}

            <div className="popup" id="popup-1">
                <div className="overlay"></div>
                <div className="content" style={{ marginTop: "30px" }}>
                    <div className="close-btn" onClick={togglePopup}>&times;</div>
                    <h1>Add User</h1>

                    <form onSubmit={onUserSubmit} action="">

                        <label htmlFor="username">Username</label>
                        <input type="text" required name="username" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label htmlFor="email">Email</label>
                        <input type="text" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <input type="password" required name="password" value={password} onChange={(e) => setPassword(e.target.value)} />


                        <label htmlFor="role">Role</label>

                        <div>
                            <label htmlFor="user">User</label>
                            <input type="radio" id='user' name="role" value="user" onClick={(e) => setRole(e.target.value)} />

                            <label htmlFor="admin">Admin</label>
                            <input type="radio" id='admin' name="role" value="admin" onClick={(e) => setRole(e.target.value)} />

                        </div>

                        <button>Add User</button>
                    </form>
                </div>
            </div>
            {/* add Modal close */}



            {/* update Modal */}

            <div className="popup" id="popup-2">
                <div className="overlay"></div>
                <div className="content" style={{ marginTop: "30px" }}>
                    <div className="close-btn" onClick={togglePopupUpdate}>&times;</div>
                    <h1>Update User</h1>

                    <form onSubmit={onUserUpdate} action="">

                        <label htmlFor="username">Username</label>
                        <input type="text" required name="username" value={usernameUpdate} onChange={(e) => setUsernameUpdate(e.target.value)} />

                        <label htmlFor="email">Email</label>
                        <input type="text" required name="email" value={emailUpdate} onChange={(e) => setEmailUpdate(e.target.value)} />

                        <label htmlFor="age">Age</label>
                        <input type="text" required name="age" value={ageUpdate} onChange={(e) => setAgeUpdate(e.target.value)} />

                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={addressUpdate} onChange={(e) => setAddressUpdate(e.target.value)} />

                        <label htmlFor="imageUpdate">Image</label>
                        <input type="file" name="imageUpdate" onChange={(e) => setImageUpdate(e.target.files[0])} />


                        <label htmlFor="role2">Role</label>

                        <div>
                            <label htmlFor="user">User</label>
                            <input type="radio"
                                name="role2"
                                id='user2'
                                value="user"
                                checked={roleUpdate === 'user' ? true : false}
                                onClick={(e) => setRoleUpdate(e.target.value)} />

                            <label htmlFor="admin2">Admin</label>
                            <input type="radio"
                                name="role"
                                id='admin2'
                                value="admin"
                                checked={roleUpdate === 'admin' ? true : false}
                                onClick={(e) => setRoleUpdate(e.target.value)} />
                        </div>

                        <button>Update User</button>
                    </form>
                </div>
            </div>
            {/* update Modal close */}


        </div >
    )
}

export default UserAdmin
