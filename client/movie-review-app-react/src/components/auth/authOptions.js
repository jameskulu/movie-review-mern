import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../../context/UserContext'
import '../layout/Header/header.css'

export default function AuthOptions() {

    const history = useHistory()

    const { userData, setUserData } = useContext(UserContext)

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
        history.push('/')
        toast.success("You are logged out successfully.")
    }

    return (
        <>
            {
                userData.user ?
                    <>
                        <li> <Link to="/profile"> Hi, {userData.user.username}</Link></li>
                        <li><Link onClick={() => {
                            if (window.confirm('Are you sure you want to logout?')) {
                                logout()
                            }
                        }}>Logout</Link></li>

                    </>
                    :
                    <>
                        <li> <Link to='/login'>Login</Link></li>
                        <li> <Link to='/signup'>Sign Up</Link></li>
                    </>
            }
        </>
    )
}