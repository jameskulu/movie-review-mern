import { Link } from "react-router-dom"

const Actor = ({actors}) => {

    return (
        <>
        {actors.map(actor =>
            <div key={actor._id} className="single-actor-section">
                <Link to={`/actors/${actor._id}`}><img src={`http://localhost:5000/uploads/${actor.image.split("\\")[1]}`} alt="" /></Link>
                <h2><Link to={`/actors/${actor._id}`}>{actor.actor_name}</Link></h2>
            </div>
        )}
        </>
    )
}

export default Actor
