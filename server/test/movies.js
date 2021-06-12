const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../server')

chai.should()
chai.use(chaiHttp)


describe('Movie API', () => {
    
    describe('GET /api/movies', () => {
        it("It should get all the movies",(done)=>{
            chai.request(server)
                .get("/api/movies")
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
        })
    })


    describe('GET /api/movies/:movieId', () => {
        it("It should get a single movie",(done)=>{
            const movieId = "603c7476a761db00e88d0649"
            chai.request(server)
                .get("/api/movies/"+movieId)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
        })
    })


    describe('POST /api/movies/new', () => {
        it("It should login get a token and create a new movie",(done)=>{

            chai.request(server)
            .post("/api/users/login")
            .send({
                email:"james@gmail.com",
                password:"madrids"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const movie = {
                movie_name:"testing_movie_name",
                summary:"testing_summary",
                release_date:"testing_date",
                length:"testing_length",
                director:"testing_director",
                genre:"testing_genre"
            }
            chai.request(server)
                .post("/api/movies/new")
                .set('Authorization','Bearer ' + token)
                .send(movie)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })
})
