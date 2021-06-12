import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Movie from '../Home/Movie'

const Movies = () => {

    const [movies, setMovies] = useState([])

    useEffect(()=>{

        const loadMovies = async () => {
            const moviesResponse = await axios.get('http://localhost:5000/api/movies/')
            const sortedMovieResponse = moviesResponse.data.data.reverse()
            setMovies(sortedMovieResponse)
        }
        
        loadMovies()

    })

    return (
        <div className="outer-latest-released">
                <h1>All <span>Movies</span></h1>
                <p>Get the taste of exicting movies on our site</p>

                <div className="latest-released">
                    <Movie movies={movies} />
                </div>
            </div>
    )
}

export default Movies
