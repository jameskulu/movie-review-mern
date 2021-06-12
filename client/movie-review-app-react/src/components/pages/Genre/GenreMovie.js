import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Movie from '../Home/Movie'

const GenreMovie = (props) => {

    const [movies, setMovies] = useState([])
    const genreName = props.match.params.genre_name

    useEffect(() => {
        const loadMovies = async () => {
            const moviesResponse = await axios.get('http://localhost:5000/api/movies/')
            setMovies(moviesResponse.data.data)
        }
        loadMovies()

    }, [])

    const filteredMovies = movies.filter(movie => {
        return genreName === movie.genre
    })

    return (
        <div>
            <div className="outer-latest-released">
                <h1>{genreName}</h1>

                <div className="latest-released">
                    <Movie movies={filteredMovies} />
                </div>
            </div>
        </div>
    )
}

export default GenreMovie
