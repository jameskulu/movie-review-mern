const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../server')

chai.should()
chai.use(chaiHttp)

describe('Actor API', () => {
    
    describe('GET /api/actors', () => {
        it("It should get all the actors",(done)=>{
            chai.request(server)
                .get("/api/actors")
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
        })
    })

    describe('GET /api/actors/:actorId', () => {
        it("It should get a single actor",(done)=>{
            const actorId = "604233c6cf00eb00904a6266"
            chai.request(server)
                .get("/api/actors/"+actorId)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
        })
    })


    describe('POST /api/actors/new', () => {
        it("It should login get a token and create a new actor",(done)=>{

            chai.request(server)
            .post("/api/users/login")
            .send({
                'email':"james@gmail.com",
                'password':"madrids"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const actor = {
                actor_name:"testing_actor_name",
                gender:'male',
                date_of_birth:"testing_date",
                bio:"testing_bio"
            }
            chai.request(server)
                .post("/api/actors/new")
                .set('Authorization','Bearer ' + token)
                .send(actor)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })
})
