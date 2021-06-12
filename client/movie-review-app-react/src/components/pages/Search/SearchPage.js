import axios from 'axios'
import React, { useState } from 'react'
import Movie from '../Home/Movie'
import './search.css'

const SearchPage = () => {

    const [searchedMovies, setSearchedMovies] = useState([])
    const [search, setSearch] = useState([])

    const onSearch = async (e) => {
        setSearch(e.target.value)

        if (e.target.value !== "") {
            const searchedMoviesResponse = await axios.get(`http://localhost:5000/api/movies/s?q=${search}`)
            const sortedSearchedMovieResponse = searchedMoviesResponse.data.data.reverse()
            setSearchedMovies(sortedSearchedMovieResponse)
        }
        else {
            const moviesResponse = await axios.get(`http://localhost:5000/api/movies`)
            const sortedMovieResponse = moviesResponse.data.data.reverse()
            setSearchedMovies(sortedMovieResponse)
        }


    }

    return (
        <div className="search">
            <input type="text" placeholder='Search for movies...' onChange={onSearch} value={search} />

            <div className="outer-latest-released">

                <div className="latest-released">
                    <Movie movies={searchedMovies} />
                </div>
            </div>
        </div>
    )
}

export default SearchPage
