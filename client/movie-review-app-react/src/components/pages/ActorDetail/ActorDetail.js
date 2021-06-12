import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const ActorDetail = (props) => {

    const [singleActor, setSingleActor] = useState({})
    const actorId = props.match.params.actorId


    useEffect(() => {
        const loadSingleActor = async () => {
            const singleActorResponse = await axios.get(`http://localhost:5000/api/actors/${actorId}`)
            setSingleActor(singleActorResponse.data.data)
        }
        loadSingleActor()


    }, [])


    return (
        <div class="user-profile">

            <div class="inner-user-profile">
                <img src={
                    singleActor.image ?
                        `http://localhost:5000/uploads/${singleActor.image.split("\\")[1]}` : "Loading.."
                } alt="" />

                <h1>{singleActor.actor_name}</h1>
                <p>{singleActor.bio}</p>

                <p><strong>Gender: </strong>{singleActor.gender}</p>
                <p><strong>Date of Birth: </strong>{singleActor.date_of_birth}</p>

            </div>

            {/* <div style={{ marginTop: "70px" }} class="outer-latest-released">
                <h1>Movies</h1>

                <p style={{ marginTop: "30px" }}>{movies.length <= 0 ? "No movies to show" : null}</p>
                <div class="latest-released">

                    <Movie movies={movies} />

                </div>
            </div> */}
        </div>
    )
}

export default ActorDetail
