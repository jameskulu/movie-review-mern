import React, { useState, useContext } from 'react'
import { useHistory,Link } from 'react-router-dom'
import Axios from 'axios'
import UserContext from '../../context/UserContext'
import './auth.css'
import { toast } from 'react-toastify'


const Login = () => {

  const history = useHistory()

  const { setUserData } = useContext(UserContext)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  const submit = async (e) => {
    e.preventDefault()

    try {
      const loginResponse = await Axios.post('http://localhost:5000/api/users/login/', { email, password })
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      })
      localStorage.setItem('auth-token', loginResponse.data.token)
      toast.success('You are logged in successfully.')
      history.push("/")
    }
    catch (err) {
      toast.error(`${err.response.data.msg }`)
    }
  }


    return (
        
        <div className="auth">
            <div className="inner-auth">
                <div className="auth-header">
                    <h1>Log In</h1>
                </div>

                <form action="" onSubmit={submit} className='auth-body'>
                    <div className="auth-email">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id='email' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="auth-password">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <Link to="#" style={{alignSelf:'flex-end',marginTop:"20px"}}>Forgot Password?</Link>
                    
                    <button>Log In</button>
                </form>
                <div className="auth-footer">
                    <p>Need an account?</p>
                    <Link to="/signup">signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
