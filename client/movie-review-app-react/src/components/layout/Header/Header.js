import React, { useContext } from 'react'
import './header.css'
import Logo from '../../../images/logo.png'
import { Link } from 'react-router-dom'
import AuthOptions from '../../auth/authOptions'
import UserContext from '../../../context/UserContext'
// import '../../../scripts'


const Header = () => {

    const { userData } = useContext(UserContext)

    const toggleMenu = () =>{
        document.getElementById('navbar').classList.toggle('toggle')
    }

    return (
        <header>
            <div className="inner-header">

                <Link to="/">
                    <div className="logo">
                        <img src={Logo} alt="" />
                        <h2>Movie<span>base</span></h2>
                    </div>
                </Link>

                <nav>
                    <i onClick={toggleMenu} id='toggle-button' className="fas fa-bars"></i>
                    <ul id='navbar'>
                        <li><Link className='active' to="/">Home</Link></li>
                        <li><Link to="/genres">Genre</Link></li>
                        <li><Link to="/movies">Movies</Link></li>
                        {/* <li><Link to="#">About Us</Link></li> */}


                        {
                             userData.user ?
                             userData.user.role === 'admin' ?
                             <li><Link to="/admin">Admin</Link></li>:
                             null
                             :
                             null
                        }

                        <AuthOptions />
                    
                    
                       

                        <li><Link to="/s"><i className="fas fa-search"></i></Link></li>
                    </ul>
                </nav>

            </div>
        </header>
    )
}

export default Header
