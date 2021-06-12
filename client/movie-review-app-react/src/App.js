import React, { useState, useEffect } from 'react';
import './App.css';

import Axios from 'axios'
import UserContext from './context/UserContext'

import Header from './components/layout/Header/Header'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/pages/Home/Home'
import Admin from './components/admin/Admin'

import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import MovieDetail from './components/pages/MovieDetail/MovieDetail';
import Genre from './components/pages/Genre/Genre';
import GenreMovie from './components/pages/Genre/GenreMovie';
import UserProfile from './components/pages/UserProfile/UserProfile';
import EditProfile from './components/pages/UserProfile/EditProfile';
import ActorDetail from './components/pages/ActorDetail/ActorDetail';
import Movies from './components/pages/Movies/Movies';
import SearchPage from './components/pages/Search/SearchPage';

toast.configure()

const App = () => {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {

    const checkLoggedIn = async () => {

      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem('auth-token', "")
        token = ""
      }

      const tokenResponse = await Axios.post('http://localhost:5000/api/users/tokenIsValid', null,
        { headers: { 'Authorization': 'Bearer ' + token } }
      )

      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/api/users/",
          { headers: { 'Authorization': 'Bearer ' + token } })

        setUserData({
          token,
          user: userResponse.data
        })
      }
    }
    checkLoggedIn()

  }, [])



  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }} >


          {/* <Route exact path='/admin' component={Admin} /> */}

          <Route exact path="/admin" render={() => (
            userData.user ?
              userData.user.role === 'admin' ?
                (<Admin />) : (<Redirect to="/" />)
              :
              null
          )
          } />


          <Route
            path="/"
            render={({ match: { url } }) => (
              <>
                <Route exact path={[
                  '/',
                  '/login',
                  '/signup',
                  '/movies/:movieId',
                  '/genres',
                  '/genres/:genre_name',
                  '/profile',
                  '/profile/edit',
                  '/actors/:actorId',
                  '/movies',
                  '/s'
                ]}
                  component={Header} />

                <main>

                  <Route exact path='/' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/signup' component={Signup} />
                  <Route exact path='/movies/:movieId' component={MovieDetail} />
                  <Route exact path='/genres' component={Genre} />
                  <Route exact path='/genres/:genre_name' component={GenreMovie} />
                  <Route exact path='/profile' component={UserProfile} />
                  <Route exact path='/profile/edit' component={EditProfile} />
                  <Route exact path='/actors/:actorId' component={ActorDetail} />
                  <Route exact path='/movies' component={Movies} />
                  <Route exact path='/s' component={SearchPage} />


                </main>

              </>
            )}
          />






        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
