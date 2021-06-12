import {Link} from 'react-router-dom'

const Movie = ({movies}) => {

    return (
        <>
        {movies.map(movie =>
            <div key={movie._id} className="single-latest-released">
                
                <Link to={`/movies/${movie._id}`}><img src={`http://localhost:5000/uploads/${movie.image.split("\\")[1]}`} alt="" /></Link>
                <div className="movie-info">
                    <h2><Link to={`/movies/${movie._id}`}>{movie.movie_name}</Link></h2>
                    <i className="fas fa-tag"></i>
                    <span><Link to={`genres/${movie.genre}`}>{movie.genre}</Link></span>
                </div>
            </div>
        )}
        </>
    )
}

export default Movie
