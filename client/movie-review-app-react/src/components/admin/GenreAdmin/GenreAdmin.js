import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const GenreAdmin = () => {

    const [genres, setGenres] = useState([])

    const [genre_name, setGenreName] = useState()

    const [genre_name_update, setGenreNameUpdate] = useState()
    const [genreId, setGenreId] = useState()

    const [deleted, setDeleted] = useState(false)


    useEffect(() => {

        const loadGenres = async () => {
            const genresResponse = await axios.get('http://localhost:5000/api/genres')
            const sortedGenresResponse = genresResponse.data.data.reverse()
            setGenres(sortedGenresResponse)
        }

        loadGenres()

    }, [genre_name,genre_name_update,deleted])

    
    const togglePopup = () => {
        document.getElementById("popup-1").classList.toggle("active");
    }

    const togglePopupUpdate = (genre) => {
        document.getElementById("popup-2").classList.toggle("active");

        setGenreNameUpdate(genre.genre_name)
        setGenreId(genre._id)
    }

    const onGenreSubmit = async (e) => {
        e.preventDefault()

        try {
            const newGenre = { genre_name }
            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:5000/api/genres/new", newGenre,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("New genre has been added.")
            setGenreName("")
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const onGenreDelete = async (id) => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.delete("http://localhost:5000/api/genres/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Genre has been deleted.")
            setDeleted(prevValue => !prevValue)
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const onGenreUpdate = async (e) => {
        e.preventDefault()

        try {
            const updateGenre = {
                genre_name: genre_name_update
            }
            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:5000/api/genres/update/" + genreId, updateGenre,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Genre has been updated.")
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    return (
        <div className="admin-table-div">

            <button onClick={togglePopup}>Add Genre</button>

            <div style={{ overflowX: "auto" }}>
                <table id="customers-table">
                    <thead>
                        <tr>
                            <th>Genre Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {genres.map(genre => {
                            return (
                                <tr key={genre._id}>
                                    <td>{genre.genre_name}</td>
                                    <td>
                                        <Link onClick={() => togglePopupUpdate(genre)} style={{ color: "blue" }}>edit </Link>|
                                        <Link style={{ color: "red" }}
                                            onClick={() => {
                                                if (window.confirm('Are you sure you wish to delete this genre?')) {
                                                    onGenreDelete(genre._id)
                                                }
                                            }}
                                        > delete</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            {/* add Modal */}

            <div className="popup" id="popup-1">
                <div className="overlay"></div>
                <div className="content">
                    <div className="close-btn" onClick={togglePopup}>&times;</div>
                    <h1>Add Genre</h1>

                    <form onSubmit={onGenreSubmit}>

                        <label htmlFor="genre_name">Genre Name</label>
                        <input type="text" name="genre_name"
                            value={genre_name}
                            required
                            onChange={(e) => setGenreName(e.target.value)} />

                        <button>Add Genre</button>
                    </form>
                </div>
            </div>
            {/* add Modal close */}



            {/* update Modal */}

            <div className="popup" id="popup-2">
                <div className="overlay"></div>
                <div className="content">
                    <div className="close-btn" onClick={togglePopupUpdate}>&times;</div>
                    <h1>Update Genre</h1>

                    <form onSubmit={onGenreUpdate}>

                        <label htmlFor="genre_name">Genre Name</label>
                        <input type="text" name="genre_name"
                            value={genre_name_update}
                            required
                            onChange={(e) => setGenreNameUpdate(e.target.value)} />
                        {/* <input type="hidden" value={genreId} /> */}

                        <button>Update Genre</button>
                    </form>
                </div>
            </div>
            {/* update Modal close */}

        </div >
    )
}

export default GenreAdmin
