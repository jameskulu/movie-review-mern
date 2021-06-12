const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../server')

chai.should()
chai.use(chaiHttp)


describe('User API', () => {

    // Testing for registering user
    describe('POST /api/users/register', () => {
        it("It should register a new user",(done)=>{
            
            const user = {
                username:"testing",
                email:"testing@gmail.com",
                password:"testing"
            }
            chai.request(server)
                .post("/api/users/register")
                .send(user)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
         })
    })

    // Testing for login user
    describe('POST /api/users/login', () => {
        it("It should login a user",(done)=>{
            
            const user = {
                email:"testing@gmail.com",
                password:"testing"
            }
            chai.request(server)
                .post("/api/users/login")
                .send(user)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
         })
    })
    
    // Testing for getting all users
    describe('GET /api/users/retrieve', () => {
        it("It should get all the users",(done)=>{
            chai.request(server)
                .get("/api/users/retrieve")
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
        })
    })
})
