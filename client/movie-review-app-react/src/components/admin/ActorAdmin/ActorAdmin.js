import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ActorAdmin = () => {

    const [actors, setActors] = useState([])

    const [actor_name, setActorName] = useState()
    const [bio, setBio] = useState()
    const [gender, setGender] = useState()
    const [date_of_birth, setDateOfBirth] = useState()
    const [image, setImage] = useState('uploads\\no-image.jpg')

    const [actorId, setActorId] = useState()
    const [actor_nameUpdate, setActorNameUpdate] = useState()
    const [bioUpdate, setBioUpdate] = useState()
    const [genderUpdate, setGenderUpdate] = useState()
    const [date_of_birthUpdate, setDateOfBirthUpdate] = useState()
    const [imageUpdate, setImageUpdate] = useState()

    const [deleted, setDeleted] = useState(false)


    useEffect(() => {

        const loadActors = async () => {
            const actorsResponse = await axios.get('http://localhost:5000/api/actors')
            const sortedActorssResponse = actorsResponse.data.data.reverse()
            setActors(sortedActorssResponse)
        }

        loadActors()

    }, [actor_name, actor_nameUpdate, deleted])


    // For adding actor

    const onActorSubmit = async (e) => {
        e.preventDefault()

        try {
            const newActor = new FormData()
            newActor.append('actor_name', actor_name)
            newActor.append('bio', bio)
            newActor.append('gender', gender)
            newActor.append('date_of_birth', date_of_birth)
            newActor.append('image', image)

            const token = localStorage.getItem("auth-token")
            await axios.post("http://localhost:5000/api/actors/new", newActor,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("New actor has been added.")

            setActorName("")
            setBio("")
            setGender("")
            setDateOfBirth("")
            setImage("")
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    // Updating Actor
    const onActorUpdate = async (e) => {
        e.preventDefault()

        try {

            const updateActor = new FormData() 
            updateActor.append('actor_name', actor_nameUpdate)
            updateActor.append('bio', bioUpdate)
            updateActor.append('gender', genderUpdate)
            updateActor.append('date_of_birth', date_of_birthUpdate)
            updateActor.append('image', imageUpdate)
           
            const token = localStorage.getItem("auth-token")
            await axios.put("http://localhost:5000/api/actors/update/" + actorId, updateActor,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Actor has been updated.")
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    // Deleting actor
    
    const onActorDelete = async (id) => {
        try {
            const token = localStorage.getItem("auth-token")
            await axios.delete("http://localhost:5000/api/actors/delete/" + id,
                { headers: { 'Authorization': 'Bearer ' + token } })
            toast.success("Actor has been deleted.")
            setDeleted(prevValue => !prevValue)
        }
        catch (err) {
            toast.error(err.response.data.msg)
        }
    }



    const togglePopup = () => {
        document.getElementById("popup-1").classList.toggle("active");
    }

    const togglePopupUpdate = (actor) => {
        document.getElementById("popup-2").classList.toggle("active");

        setActorId(actor._id)
        setActorNameUpdate(actor.actor_name)
        setBioUpdate(actor.bio)
        setDateOfBirthUpdate(actor.date_of_birth)
        setGenderUpdate(actor.gender)
        setImageUpdate(actor.image)

    }

    return (
        <div className="admin-table-div">

            <button onClick={togglePopup}>Add Actor</button>

            <div style={{ overflowX: "auto" }}>
                <table id="customers-table">
                    <thead>
                        <tr>
                            <th>Actors Name</th>
                            <th>Bio</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {actors.map(actor => {
                            return (
                                <tr key={actor._id}>
                                    <td>{actor.actor_name}</td>
                                    <td>{actor.bio}</td>
                                    <td>{actor.date_of_birth}</td>
                                    <td>{actor.gender}</td>
                                    <td ><img height="100" src={`http://localhost:5000/uploads/${actor.image.split("\\")[1]}`} alt="" /></td>
                                    <td>
                                        <Link onClick={() => togglePopupUpdate(actor)} style={{ color: "blue" }}>edit </Link>|
                                        <Link style={{ color: "red" }}
                                            onClick={() => {
                                                if (window.confirm('Are you sure you wish to delete this actor?')) {
                                                    onActorDelete(actor._id)
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
                    <h1>Add Actor</h1>

                    <form onSubmit={onActorSubmit}>

                        <label htmlFor="actor_name">Actor Name</label>
                        <input type="text"
                            required
                            name="actor_name" value={actor_name}
                            onChange={(e) => setActorName(e.target.value)} />

                        <label htmlFor="bio">Bio</label>
                        <input type="text" name="bio" value={bio}
                            required
                            onChange={(e) => setBio(e.target.value)} />

                        <label htmlFor="gender">Gender</label>

                        <div>
                            <label htmlFor="male">Male</label>
                            <input type="radio" id='male' name="gender" value="male" onClick={(e) => setGender(e.target.value)} />
                            <label htmlFor='female'>Female</label>
                            <input type="radio" id='female' name="gender" value="female" onClick={(e) => setGender(e.target.value)} />
                        </div>

                        <label htmlFor="date_of_birth">Date of birth</label>
                        <input type="text" name="date_of_birth" value={date_of_birth}
                            required
                            onChange={(e) => setDateOfBirth(e.target.value)} />

                        <label htmlFor="image">Image</label>
                        <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />


                        <button>Add Actor</button>
                    </form>
                </div>
            </div>
            {/* add Modal close */}


            {/* update Modal */}

            <div className="popup" id="popup-2">
                <div className="overlay"></div>
                <div className="content">
                    <div className="close-btn" onClick={togglePopupUpdate}>&times;</div>
                    <h1>Update Actor</h1>

                    <form onSubmit={onActorUpdate}>

                        <label htmlFor="actor_name">Actor Name</label>
                        <input type="text" name="actor_name" value={actor_nameUpdate}
                            onChange={(e) => setActorNameUpdate(e.target.value)} />

                        <label htmlFor="bio">Bio</label>
                        <input type="text" name="bio" value={bioUpdate}
                            onChange={(e) => setBioUpdate(e.target.value)} />

                        <label htmlFor="gender">Gender</label>

                        <div>
                            <label htmlFor='male'>Male</label>
                            <input type="radio"
                                name="gender"
                                id='male'
                                checked={genderUpdate === 'male' ? true : false}
                                value="male"
                                onClick={(e) => setGenderUpdate(e.target.value)} />

                            <label htmlFor='female'>Female</label>
                            <input type="radio"
                                name="gender"
                                id='female'
                                checked={genderUpdate === 'female' ? true : false}
                                value="female"
                                onClick={(e) => setGenderUpdate(e.target.value)} />
                        </div>

                        <label htmlFor="date_of_birth">Date of birth</label>
                        <input type="text" name="date_of_birth" value={date_of_birthUpdate}
                            onChange={(e) => setDateOfBirthUpdate(e.target.value)} />

                        <label htmlFor="image">Image</label>
                        <input type="file" name="imageUpdate" onChange={(e) => setImageUpdate(e.target.files[0])} />

                        <button>Update Actor</button>
                    </form>
                </div>
            </div>
            {/* update Modal close */}

        </div >
    )
}

export default ActorAdmin
