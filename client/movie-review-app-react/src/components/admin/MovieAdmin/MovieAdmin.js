import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"


const MovieAdmin = () => {


    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [actors, setActors] = useState([])

    const [movie_name, setMovieName] = useState()
    const [summary, setSummary] = useState()
    const [length, setLength] = useState()
    const [director, setDirector] = useState()
    const [release_date, setReleaseDate] = useState()
    const [rating, setRating] = useState()
    const [genre, setGenre] = useState()
    const [actorInput, setActorInput] = useState([])
    const [image, setImage] = useState('uploads\\no-image.jpg')


    const [movieId, setMovieId] = useState()
    const [movie_nameUpdate, setMovieNameUpdate] = useState()
    const [summaryUpdate, setSummaryUpdate] = useState()
    const [lengthUpdate, setLengthUpdate] = useState()
    const [directorUpdate, setDirectorUpdate] = useState()
    const [release_dateUpdate, setReleaseDateUpdate] = useState()
    const [ratingUpdate, setRatingUpdate] = useState()
    const [genreUpdate, setGenreUpdate] = useState()
    const [imageUpdate, setImageUpdate] = useState()

    const [deleted, setDeleted] = useState(false)


    useEffect(() => {
        const loadMovies = async () => {
            const moviesResponse = await axios.get('http://localhost:5000/api/movies')
            const sortedMoviesResponse = moviesResponse.data.data.reverse()
            setMovies(sortedMoviesResponse)
        }
        loadMovies()

        const loadGenres = async () => {
            const genresResmponse = await axios.get('http://localhost:5000/api/genres')
            setGenres(genresResmponse.data.data)
        }
        loadGenres()

        const loadActors = async () => {
            const actorsResmponse = await axios.get('http://localhost:5000/api/actors')
            setActors(actorsResmponse.data.data)
        }
        loadActors()


    }, [movie_name, movie_nameUpdate, deleted])


    const togglePopup = () => {
        document.getElementById("popup-1").classList.toggle("active");
    }

    const togglePopupUpdate = (movie) => {
        document.getElementById("popup-2").classList.toggle("active");

        setMovieId(movie._id)
        setMovieNameUpdate(movie.movie_name)
        setSummaryUpdate(movie.summary)
        setReleaseDateUpdate(movie.release_date)
        setRatingUpdate(movie.rating)
        setDirectorUpdate(movie.director)
        setLengthUpdate(movie.length)
        setGenreUpdate(movie.genre)
        setImageUpdate(movie.image)

        // setActorInputUpdate(movie.actor)
        // setActorInputUpdate([...actorInputUpdate, movie.actor])

    }


    const onMovieSubmit = async (e) => {
        e.preventDefault()

        try {

            const newMovie = new FormData() // new line
            newMovie.append('movie_name', movie_name)
            newMovie.append('summary', summary)
            newMovie.append('length', length)
            newMovie.append('director', director)
            newMovie.append('image', image)
            newMovie.append('release_date', release_date)
            newMovie.append('rating', rating)
            newMovie.append('genre', genre)

            actorInput.forEach((actor) => {
                newMovie.append('actor', actor);
            });

            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:5000/api/movies/new", newMovie,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("New movie has been added.")

            setMovieName("")
            setSummary("")
            setLength("")
            setRating("")
            setDirector("")
            setReleaseDate("")
            setGenre("")
            setImage("")

        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    // Updating Movie
    const onMovieUpdate = async (e) => {
        e.preventDefault()

        try {
            const updateMovie = new FormData()
            updateMovie.append('movie_name', movie_nameUpdate)
            updateMovie.append('summary', summaryUpdate)
            updateMovie.append('length', lengthUpdate)
            updateMovie.append('director', directorUpdate)
            updateMovie.append('image', imageUpdate)
            updateMovie.append('release_date', release_dateUpdate)
            updateMovie.append('rating', ratingUpdate)
            updateMovie.append('genre', genreUpdate)

            // actorInputUpdate.forEach((actor) => {
            //     updateMovie.append('actor', actor);
            // });


            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:5000/api/movies/update/" + movieId, updateMovie,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Movie has been updated.")
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const onMovieDelete = async (id) => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.delete("http://localhost:5000/api/movies/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Movie has been deleted.")
            setDeleted(prevValue => !prevValue)
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    const handleActorSelect = (e) => {
        var ActorArr = [...actorInput];
        const value = e.target.value
        const index = ActorArr.findIndex(actor => actor === value);
        if (index > -1) {
            ActorArr = [...ActorArr.slice(0, index), ...ActorArr.slice(index + 1)]
        } else {
            ActorArr.push(value);
        }
        setActorInput(ActorArr)
    }


    return (
        <div className="admin-table-div">

            <button onClick={togglePopup}>Add Movie</button>

            <div style={{ overflowX: "auto" }}>
                <table id="customers-table">
                    <thead>
                        <tr>
                            <th>Movie Name</th>
                            <th>Summary</th>
                            <th>Length</th>
                            <th>Rating</th>
                            <th>Released Date</th>
                            <th>Director</th>
                            <th>Actors</th>
                            <th>Genre</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {movies.map(movie => {
                            return (
                                <tr key={movie._id}>
                                    <td>{movie.movie_name}</td>
                                    <td>{movie.summary}</td>
                                    <td>{movie.length}</td>
                                    <td>{movie.rating}</td>
                                    <td>{movie.release_date}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.actor.map(act => {
                                        return (
                                            <span>{act.actor_name}, </span>
                                        )
                                    })}</td>
                                    <td>{movie.genre}</td>
                                    <td><img height="100" src={`http://localhost:5000/uploads/${movie.image.split("\\")[1]}`} alt="" /></td>
                                    <td>
                                        <Link onClick={() => togglePopupUpdate(movie)} style={{ color: "blue" }}>edit </Link>|
                                        <Link style={{ color: "red" }}
                                            onClick={() => {
                                                if (window.confirm('Are you sure you wish to delete this movie?')) {
                                                    onMovieDelete(movie._id)
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

            {/* Add Modal */}

            <div className="popup" id="popup-1">
                <div className="overlay"></div>
                <div className="content" style={{ marginTop: "40px" }}>
                    <div className="close-btn" onClick={togglePopup}>&times;</div>
                    <h1>Add Movie</h1>

                    <form onSubmit={onMovieSubmit}>

                        <label htmlFor="movie_name">Movie Name</label>
                        <input type="text"
                            name="movie_name"
                            value={movie_name}
                            required
                            onChange={(e) => setMovieName(e.target.value)} />

                        <label htmlFor="summary">Summary</label>
                        <input type="text"
                            name="summary"
                            required
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)} />

                        <label htmlFor="length">Length</label>
                        <input type="text"
                            name="length"
                            required
                            value={length}
                            onChange={(e) => setLength(e.target.value)} />

                        <label htmlFor="rating">Rating</label>
                        <input type="text"
                            name="rating"
                            value={rating}
                            required
                            onChange={(e) => setRating(e.target.value)} />

                        <label htmlFor="director">Director</label>
                        <input type="text"
                            name="director"
                            required
                            value={director}
                            onChange={(e) => setDirector(e.target.value)} />

                        <label htmlFor="release_date">Released Date</label>
                        <input type="text"
                            name="release_date"
                            required
                            value={release_date}
                            onChange={(e) => setReleaseDate(e.target.value)} />

                        <label htmlFor="image">Image</label>
                        <input type="file"
                            name="image"
                            onChange={(e) => setImage(e.target.files[0])} />

                        <label htmlFor="genre">Genre</label>
                        <select name="genre"
                            id=""
                            required
                            value={genre} onChange={(e) => setGenre(e.target.value)}>
                            <option disabled defaultValue value> -- select a genre -- </option>
                            {
                                genres.map(genre => {
                                    return (
                                        <option key={genre._id} value={genre.genre_name}>{genre.genre_name}</option>
                                    )
                                })
                            }

                        </select>

                        <label htmlFor="">Actors</label>
                        <div>
                            {
                                actors.map(actor => {
                                    return (
                                        <>
                                            <label htmlFor={actor.actor_name}>{actor.actor_name}</label>
                                            <input
                                                value={actor._id}
                                                id={actor.actor_name}
                                                onChange={handleActorSelect}
                                                type="checkbox" />

                                            <br />
                                        </>
                                    )

                                })
                            }
                        </div>

                        <button>Add Movie</button>
                    </form>
                </div>
            </div>
            {/* add Modal close */}



            {/* update Modal */}

            <div className="popup" id="popup-2">
                <div className="overlay"></div>
                <div className="content" style={{ marginTop: "40px" }}>
                    <div className="close-btn" onClick={togglePopupUpdate}>&times;</div>
                    <h1>Update Movie</h1>

                    <form onSubmit={onMovieUpdate}>

                        <label htmlFor="movie_name">Movie Name</label>
                        <input type="text"
                            required
                            name="movie_name"
                            value={movie_nameUpdate}
                            onChange={(e) => setMovieNameUpdate(e.target.value)} />

                        <label htmlFor="summary">Summary</label>
                        <input type="text"
                            name="summary"
                            required
                            value={summaryUpdate}
                            onChange={(e) => setSummaryUpdate(e.target.value)} />

                        <label htmlFor="length">Length</label>
                        <input type="text"
                            name="length"
                            required
                            value={lengthUpdate}
                            onChange={(e) => setLengthUpdate(e.target.value)} />

                        <label htmlFor="rating">Rating</label>
                        <input type="text"
                            name="rating"
                            required
                            value={ratingUpdate}
                            onChange={(e) => setRatingUpdate(e.target.value)} />

                        <label htmlFor="director">Director</label>
                        <input type="text"
                            name="director"
                            required
                            value={directorUpdate}
                            onChange={(e) => setDirectorUpdate(e.target.value)} />

                        <label htmlFor="release_date">Released Date</label>
                        <input type="text"
                            name="release_date"
                            required
                            value={release_dateUpdate}
                            onChange={(e) => setReleaseDateUpdate(e.target.value)} />

                        <label htmlFor="imageUpdate">Image</label>
                        <input type="file"
                            name="imageUpdate"
                            onChange={(e) => setImageUpdate(e.target.files[0])} />

                        <label htmlFor="genre">Genre</label>
                        <select name="genre"
                            id=""
                            value={genreUpdate} onChange={(e) => setGenreUpdate(e.target.value)}>
                            {/* <option disabled defaultValue value> -- select a genre -- </option> */}
                            {
                                genres.map(genre => {
                                    return (
                                        <option
                                            key={genre._id}
                                            value={genre.genre_name}
                                            selected={genreUpdate === genre.genre_name}
                                        >
                                            {genre.genre_name}
                                        </option>
                                    )
                                })
                            }

                        </select>

                        {/* <label htmlFor="">Actors</label>
                        <div>
                            {
                                actors.map(actor => {
                                    return (
                                        <>
                                            <label htmlFor={actor.actor_name}>{actor.actor_name}</label>
                                            <input value={actor._id}
                                                id={actor.actor_name}
                                                onChange={handleActorSelectUpdate}
                                                type="checkbox" /><br />
                                        </>
                                    )

                                })
                            }
                        </div> */}

                        <button>Update Movie</button>
                    </form>
                </div>
            </div>
            {/* update Modal close */}



        </div >
    )
}

export default MovieAdmin
