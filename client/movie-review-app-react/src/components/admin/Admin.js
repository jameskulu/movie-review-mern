import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ActorAdmin from './ActorAdmin/ActorAdmin'
import './admin.css'
import GenreAdmin from './GenreAdmin/GenreAdmin'
import MovieAdmin from './MovieAdmin/MovieAdmin'
import UserAdmin from './UserAdmin/UserAdmin'

import UserContext from '../../context/UserContext'
import { toast } from 'react-toastify'



const Admin = () => {

  const history = useHistory()

  const [userNav, setUserNav] = useState(false)
  const [movieNav, setMovieNav] = useState(false)
  const [actorNav, setActorNav] = useState(false)
  const [genreNav, setGenreNav] = useState(false)



  const [usersLength, setUsersLength] = useState(0)
  const [moviesLength, setMoviesLength] = useState(0)
  const [genresLength, setUsetGenresLength] = useState(0)
  const [actorsLength, setActorsLength] = useState(0)


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


  useEffect(() => {

    const loadUsers = async () => {
      const usersResponse = await axios.get('http://localhost:5000/api/users/retrieve')
      setUsersLength(usersResponse.data.data.length)
    }

    loadUsers()

    const loadMovies = async () => {
      const moviesResponse = await axios.get('http://localhost:5000/api/movies')
      setMoviesLength(moviesResponse.data.data.length)
    }

    loadMovies()

    const loadActors = async () => {
      const actorsResponse = await axios.get('http://localhost:5000/api/actors')
      setActorsLength(actorsResponse.data.data.length)
    }

    loadActors()

    const loadGenres = async () => {
      const genresResponse = await axios.get('http://localhost:5000/api/genres')
      setUsetGenresLength(genresResponse.data.data.length)
    }

    loadGenres()

  }, [usersLength, moviesLength, actorsLength, genresLength])


  const onUserNavigate = () => {
    document.getElementById("userNav").classList.add('active_menu_link')
    document.getElementById("movieNav").classList.remove('active_menu_link')
    document.getElementById("actorNav").classList.remove('active_menu_link')
    document.getElementById("genreNav").classList.remove('active_menu_link')
    setUserNav(true)
    setMovieNav(false)
    setActorNav(false)
    setGenreNav(false)
  }

  const onMovieNavigate = () => {
    document.getElementById("userNav").classList.remove('active_menu_link')
    document.getElementById("movieNav").classList.add('active_menu_link')
    document.getElementById("actorNav").classList.remove('active_menu_link')
    document.getElementById("genreNav").classList.remove('active_menu_link')
    setUserNav(false)
    setMovieNav(true)
    setActorNav(false)
    setGenreNav(false)
  }

  const onActorNavigate = () => {
    document.getElementById("userNav").classList.remove('active_menu_link')
    document.getElementById("movieNav").classList.remove('active_menu_link')
    document.getElementById("actorNav").classList.add('active_menu_link')
    document.getElementById("genreNav").classList.remove('active_menu_link')
    setUserNav(false)
    setMovieNav(false)
    setActorNav(true)
    setGenreNav(false)
  }

  const onGenreNavigate = () => {
    document.getElementById("userNav").classList.remove('active_menu_link')
    document.getElementById("movieNav").classList.remove('active_menu_link')
    document.getElementById("actorNav").classList.remove('active_menu_link')
    document.getElementById("genreNav").classList.add('active_menu_link')
    setUserNav(false)
    setMovieNav(false)
    setActorNav(false)
    setGenreNav(true)
  }


  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav_icon" onclick="toggleSidebar()">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="navbar__left">
          <Link to="/admin">Admin</Link>
          <Link to="/">Homepage</Link>

        </div>
        <div className="navbar__right">
          <Link to="#">
            <i className="fa fa-search" aria-hidden="true"></i>
          </Link>
          <Link to="#">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </Link>
          <Link to="#">
            <img width="30" src="assets/avatar.svg" alt="" />
          </Link>
        </div>
      </nav>

      <div class='main'>
        <div className="main__container">
          {/* <!-- MAIN TITLE STARTS HERE --> */}

          <div className="main__title">
            <img src="assets/hello.svg" alt="" />
            <div className="main__greeting">
              <h1>Hello {userData.user ? userData.user.username : null}</h1>
              <p>Welcome to your admin dashboard</p>
            </div>
          </div>

          {/* <!-- MAIN TITLE ENDS HERE --> */}


          {/* <!-- MAIN CARDS STARTS HERE --> */}
          <div className="main__cards">
            <div className="card">
              <div className="card_inner">
                <p className="text-primary-p">Number of Users</p>
                <span className="font-bold text-title">{usersLength}</span>
              </div>
            </div>

            <div className="card">
              <div className="card_inner">
                <p className="text-primary-p">Number of Movies</p>
                <span className="font-bold text-title">{moviesLength}</span>
              </div>
            </div>

            <div className="card">
              <div className="card_inner">
                <p className="text-primary-p">Number of Genres</p>
                <span className="font-bold text-title">{genresLength}</span>
              </div>
            </div>

            <div className="card">
              <div className="card_inner">
                <p className="text-primary-p">Number of Actors</p>
                <span className="font-bold text-title">{actorsLength}</span>
              </div>
            </div>
          </div>
          {/* <!-- MAIN CARDS ENDS HERE --> */}


          {userNav ? <UserAdmin /> : null}
          {movieNav ? <MovieAdmin /> : null}
          {actorNav ? <ActorAdmin /> : null}
          {genreNav ? <GenreAdmin /> : null}


        </div>
      </div>

      <div id="sidebar">
        <div className="sidebar__title">
          <div className="sidebar__img">

            <h1>Moviebase</h1>
          </div>
          <i onclick="closeSidebar()"
            className="fa fa-times"
            id="sidebarIcon"
            aria-hidden="true"
          ></i>
        </div>
        <div className="sidebar__menu">
          <div id="userNav" className="sidebar__link">
            <i className="fa fa-home"></i>
            <Link onClick={onUserNavigate}>Users</Link>
          </div>

          <div id="movieNav" className="sidebar__link">
            <i className="fa fa-home"></i>
            <Link onClick={onMovieNavigate}>Movies</Link>
          </div>

          <div id="genreNav" className="sidebar__link">
            <i className="fa fa-home"></i>
            <Link onClick={onGenreNavigate}>Genres</Link>
          </div>

          <div id="actorNav" className="sidebar__link">
            <i className="fa fa-home"></i>
            <Link onClick={onActorNavigate}>Actors</Link>
          </div>

          <div className="sidebar__logout">
            <i className="fa fa-power-off"></i>
            <Link onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                logout()
              }
            }}>Logout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
