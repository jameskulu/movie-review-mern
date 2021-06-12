import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import UserContext from '../../../context/UserContext'

const Comment = ({ setDeleted, text, commentedBy, image, movieId }) => {

    const { userData } = useContext(UserContext)


    const onCommentDelete = async () => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:5000/api/movies/remove-comment/" + movieId,
                { text, commentedBy, image },
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Comment has been deleted.")
            setDeleted(prevValue => !prevValue)
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <div className="single-comment-section">
            <img src={
                image ?
                    `http://localhost:5000/uploads/${image.split("\\")[1]}` : "Loading.."
            } alt="" />
            <div className="name-comment">
                <h2>{commentedBy}</h2>
                <p>{text}</p>
                {userData.user
                    ?
                    (userData.user.username === commentedBy) ? <i
                        onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this comment?')) {
                                onCommentDelete()
                            }
                        }
                        } class="fas fa-trash-alt"></i> : null
                    :
                    null
                }
            </div>



        </div >
    )
}

export default Comment
