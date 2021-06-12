import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import Movie from '../Home/Movie'
import './user-profile.css'

const UserProfile = () => {

    const { userData } = useContext(UserContext)

    const [movies, setMovies] = useState([])

    useEffect(() => {
        setMovies(userData.user ? userData.user.watchlist : [])
    }, [])


    return (
        <div class="user-profile">

            <div class="inner-user-profile">
                <img src={
                    userData.user ?
                        `http://localhost:5000/uploads/${userData.user.image.split("\\")[1]}` : "Loading.."
                } alt="" />

                <h1>{userData.user ? userData.user.username : null}</h1>
                <p><strong>Email: </strong>{userData.user ? userData.user.email : null}</p>

                <p><strong>Age: </strong>{userData.user ? userData.user.age : null}</p>
                <p><strong>Address: </strong>{userData.user ? userData.user.address : null}</p>

                <Link to='/profile/edit'><button>Edit Profile</button></Link>
            </div>

            <div style={{ marginTop: "70px" }} class="outer-latest-released">
                <h1>My Watchlist</h1>

                <p style={{ marginTop: "30px" }}>{movies.length <= 0 ? "No movies added to watchlist" : null}</p>
                <div class="latest-released">

                    <Movie movies={movies} />

                </div>
            </div>
        </div>
    )
}

export default UserProfile
