const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../server')

chai.should()
chai.use(chaiHttp)


describe('Genre API', () => {
    
    describe('GET /api/genres', () => {
        it("It should get all the genres",(done)=>{
            chai.request(server)
                .get("/api/genres")
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
        })
    })

    describe('GET /api/genres/:genreId', () => {
        it("It should get a single genre",(done)=>{
            const genreId = "60411925922fb411e8064ee8"
            chai.request(server)
                .get("/api/genres/"+genreId)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
        })
    })


    describe('POST /api/genres/new', () => {
        it("It should login get a token and create a new genre",(done)=>{

            chai.request(server)
            .post("/api/users/login")
            .send({
                'email':"james@gmail.com",
                'password':"madrids"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const genre = {
                genre_name:"testing_genre_name"
            }
            chai.request(server)
                .post("/api/genres/new")
                .set('Authorization','Bearer ' + token)
                .send(genre)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })


})
