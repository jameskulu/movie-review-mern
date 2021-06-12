import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import UserContext from '../../../context/UserContext'

const EditProfile = () => {

    const history = useHistory()
    const { userData, setUserData } = useContext(UserContext)

    const [age, setAge] = useState(userData.user ? userData.user.age : "")
    const [address, setAddress] = useState(userData.user ? userData.user.address : "")
    const [image, setImage] = useState(userData.user ? userData.user.image : "")


    const onEditProfile = async (e) => {

        e.preventDefault()

        try {

            const updateUser = new FormData() // new line
            updateUser.append('image', image)
            updateUser.append('address', address)
            updateUser.append('age', age)
           
            // const updateUser = {
            //     age: age,
            //     address: address,
            // }

            const token = localStorage.getItem("auth-token")
            const userResponse = await axios.put("http://localhost:5000/api/users/update/" + userData.user._id, updateUser,
                { headers: { 'Authorization': 'Bearer ' + token } })
            setUserData({
                token: localStorage.getItem('auth-token'),
                user: userResponse.data.data
            })
            history.push('/profile')
            toast.success("Profile updated")


        }
        catch (err) {
            toast.error(err.response.data.msg)
        }

    }

    return (
        <div className="edit-profile">

            <h1>Edit Profile</h1>

            <form onSubmit={onEditProfile}>
                <label htmlFor="">Image</label>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

                <label htmlFor="">Age</label>
                <input type="text" onChange={(e) => setAge(e.target.value)} value={age} />

                <label htmlFor="">Address</label>
                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />

                <button>Update</button>

            </form>
        </div>
    )
}

export default EditProfile
