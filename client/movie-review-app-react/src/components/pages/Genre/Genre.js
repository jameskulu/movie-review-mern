import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './genre.css'

const Genre = () => {

    const [genres, setGenres] = useState([])

    useEffect(() => {

        const loadGenres = async () => {
            const genresResponse = await axios.get('http://localhost:5000/api/genres')
            const sortedGenresResponse = genresResponse.data.data.reverse()
            setGenres(sortedGenresResponse)
        }

        loadGenres()

    }, [])

    return (
        <div className="genre-section">
            <h1>Genre</h1>
            <div className="inner-genre-section">

                {
                    genres.map(genre => {
                        return (
                            <Link to={`genres/${genre.genre_name}`}>
                                <div className="single-genre">
                                    <h3>{genre.genre_name}</h3>
                                </div>
                            </Link>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Genre
