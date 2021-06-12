import {useEffect,useState} from 'react'
import Axios from 'axios'
import './home.css'
import Movie from './Movie'
import Actor from './Actor'


const Home = () => {

   
    const [latestMovies, setLatestMovies] = useState([])
    const [topRatedMovies, settopRatedMovies] = useState([])
    const [actors, setActors] = useState([])
    

    useEffect(() => {

        const loadLatestMovies = async () => {
            const latestMoviesResponse = await Axios.get('http://localhost:5000/api/movies/')
            const sortedLatestMovieResponse = latestMoviesResponse.data.data.reverse()
            setLatestMovies(sortedLatestMovieResponse)
        }
        
        loadLatestMovies()



        const loadActors = async () => {
            const actorsResponse = await Axios.get('http://localhost:5000/api/actors/')
            const sortedActorsResponse = actorsResponse.data.data.reverse()
            setActors(sortedActorsResponse)
        }
        
        loadActors()


        const loadTopRatedMovies = async () => {
            const topRatedMoviesResponse = await Axios.get('http://localhost:5000/api/movies/')
            const sortedTopRatedMovieResponse = topRatedMoviesResponse.data.data.sort((a,b)=>b.rating-a.rating)
            settopRatedMovies(sortedTopRatedMovieResponse)
        }
        
        loadTopRatedMovies()

    }, [])


    return (
        <div className="index">

            <div className="outer-latest-released">
                <h1>Latest <span>Released</span></h1>
                <p>Be sure not to miss these reviews today.</p>

                <div className="latest-released">
                    <Movie movies={latestMovies} />
                </div>
            </div>
            
            <div className="outer-actors-section">

                <h1>Famous <span>People</span></h1>
                <p>Our most recently released reviews.</p>

                <div className="actors-section">

                   <Actor actors = {actors}/>

                </div>

            </div>


            <div className="outer-latest-released">
                <h1>Top <span>Rated</span></h1>
                <p>Our most recently released reviews.</p>

                <div className="latest-released">
                    <Movie movies={topRatedMovies} />
                </div>
            </div>
        </div>
    )
}

export default Home
