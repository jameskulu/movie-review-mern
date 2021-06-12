import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import './auth.css'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { toast } from 'react-toastify'


const Signup = () => {

    const history = useHistory()

    const { setUserData } = useContext(UserContext)

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()

    const submit = async (e) => {
        e.preventDefault()

        if(password !== password2){
            return toast.error('Two password fields did not match.')
        }

        try {
            const newUser = { username, email, password }
            await Axios.post("http://localhost:5000/api/users/register", newUser)
            const loginResponse = await Axios.post('http://localhost:5000/api/users/login', { email, password })
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            })

            localStorage.setItem('auth-token', loginResponse.data.token)
            history.push("/")
            toast.success("Your account is created successfully.")
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    
    return (
        <div className="auth">
            
            <div className="inner-auth">
                <div className="auth-header">
                    <h1>Sign Up</h1>
                </div>

                
                <form action="" onSubmit={submit} className='auth-body'>

                    <div className="auth-username">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id='username'  onChange={e => setUsername(e.target.value)}/>
                    </div>

                    <div className="auth-email">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id='email'  onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="auth-password">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id='password'  onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className="auth-confirm-password">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" name="confirm-password" id='confirm-password' onChange={e => setPassword2(e.target.value)}/>
                    </div>

                    <button>Sign Up</button>

                </form>
                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <Link to="/login">login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
