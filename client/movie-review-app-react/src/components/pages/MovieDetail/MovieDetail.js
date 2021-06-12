import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Actor from '../Home/Actor'
import './movie-detail.css'
import Comment from './Comment'
import UserContext from '../../../context/UserContext'
import { toast } from 'react-toastify'


const MovieDetail = (props) => {

    const [singleMovie, setSingleMovie] = useState({})
    const [actors, setActors] = useState([])

    const [comment, setComment] = useState()
    const movieId = props.match.params.movieId

    const [deleted, setDeleted] = useState(false)

    const { userData, setUserData } = useContext(UserContext)


    useEffect(() => {
        const loadSingleMovie = async () => {
            const singleMovieResponse = await axios.get(`http://localhost:5000/api/movies/${movieId}`)
            setSingleMovie(singleMovieResponse.data.data)
            setActors(singleMovieResponse.data.data.actor)
        }
        loadSingleMovie()


    }, [comment, deleted, userData])


    const checkMovie = () => {
        if (userData.user) {
            const a = userData.user.watchlist.some(watch => watch['movie_name'] === singleMovie.movie_name)
            console.log(a)
        }
    }
    checkMovie()

    const onCommentAdd = async (e) => {
        e.preventDefault()

        if (userData.user !== undefined) {
            try {
                const newComment = {
                    text: comment,
                    commentedBy: userData.user.username,
                    image: userData.user.image
                }
                const token = localStorage.getItem("auth-token")
                await axios.put("http://localhost:5000/api/movies/add-comment/" + singleMovie._id, newComment,
                    { headers: { 'Authorization': 'Bearer ' + token } })
                toast.success("Comment added")

                setComment("")

            }
            catch (err) {
                toast.error(err.response.data.msg)
            }
        }
        else {
            toast.error("Please login to comment")
        }
    }


    const onWatchlistEvent = async (e) => {
        e.preventDefault()

        if (userData.user !== undefined) {
            try {
                const token = localStorage.getItem("auth-token")
                const userResponse = await axios.put("http://localhost:5000/api/users/add-to-watchlist/" + singleMovie._id, null,
                    { headers: { 'Authorization': 'Bearer ' + token } })
                toast.success("Added to watchlist")
                setUserData({
                    token: localStorage.getItem('auth-token'),
                    user: userResponse.data.data
                })
            }
            catch (err) {
                toast.error(err.response.data.msg)
            }
        }
        else {
            toast.error("Please login to add to watchlist")
        }
    }


    const onRemoveWatchlistEvent = async (e) => {
        e.preventDefault()


        if (userData.user !== undefined) {
            try {
                const token = localStorage.getItem("auth-token")
                const userResponse = await axios.put("http://localhost:5000/api/users/remove-from-watchlist/" + singleMovie._id, null,
                    { headers: { 'Authorization': 'Bearer ' + token } })
                setUserData({
                    token: localStorage.getItem('auth-token'),
                    user: userResponse.data.data
                })
                toast.success("Removed from watchlist")
            }
            catch (err) {
                toast.error(err.response.data.msg)
            }
        }
        else {
            toast.error("Please login to remove from watchlist")
        }

    }

    return (
        <div className="movie-detail">

            <div className="outer-movie-detail">
                <div className="left-movie-detail">
                    <img src={
                        singleMovie.image ?
                            `http://localhost:5000/uploads/${singleMovie.image.split("\\")[1]}` : "Loading.."
                    } alt="" />
                </div>
                <div className="right-movie-detail">
                    <h1>{singleMovie.movie_name}</h1>
                    <div className="movie-detail-desc">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-tag"></i>
                        <span><Link to={`/genres/${singleMovie.genre}`}>{singleMovie.genre}</Link></span>
                        <i className="fas fa-clock"></i>
                        <span>{singleMovie.release_date}</span>
                    </div>
                    <p>{singleMovie.summary}</p>
                    <p>Duration: <span>{singleMovie.length}</span></p>
                    <p>Director: <span>{singleMovie.director}</span></p>

                    {/* <button onClick={onRemoveWatchlistEvent}>Remove From Watchlist</button>
                    <button onClick={onWatchlistEvent}>Add To Watchlist</button> */}
                    {
                        userData.user ?
                            userData.user.watchlist.some(watch => watch['movie_name'] === singleMovie.movie_name) ?
                                <button id='removeBtn' onClick={onRemoveWatchlistEvent}>Remove From Watchlist</button> :
                                <button id='addBtn' onClick={onWatchlistEvent}>Add To Watchlist</button>
                            :
                            <button id='addBtn' onClick={onWatchlistEvent}>Add To Watchlist</button>
                    }




                </div>
            </div>



            <div style={{ marginTop: "50px", textAlign: "center" }} className="outer-actors-section">

                <h1 style={{ fontSize: "30px" }}>Actors</h1>
                <p style={{ marginTop: "30px" }}>{actors.length <= 0 ? "No actors to show" : null}</p>
                <div className="actors-section">

                    <Actor actors={actors} />

                </div>

            </div>


            {/* <div className="rate-section">

                <div className="inner-rate-section">

                    <h3>Review this movie</h3>

                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>

                </div>

            </div> */}


            <div className="comment-section">

                <h1>Comments</h1>

                <form onSubmit={onCommentAdd} className="add-comment-section">
                    <input type="text"
                        placeholder="Write a comment..."
                        onChange={(e) => setComment(e.target.value)}
                        required
                        value={comment}
                    />
                    <button>Add Comment</button>
                </form>

                <div className="comment-added-section">
                    {
                        singleMovie.comment ?
                            singleMovie.comment.slice(0).reverse().map(comment => {
                                return (
                                    <Comment setDeleted={setDeleted} movieId={movieId} text={comment.text} commentedBy={comment.commentedBy} image={comment.image} />
                                )
                            }) : "Loading.."
                    }
                </div>
            </div>

        </div >
    )
}

export default MovieDetail
