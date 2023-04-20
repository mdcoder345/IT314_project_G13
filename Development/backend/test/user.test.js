const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("User",()=>{
    //login module
    describe("POST /login",()=>{
        it("it should login user",(done)=>{
            chai
            .request(app)
            .post("/login")
            .send({
                username_email:"isha@121",
                password:"12345"
            })
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

    //register module
    describe("POST /register",()=>{
        it("it should register user",(done)=>{
            chai
            .request(app)
            .post("/register")
            .send({
                username:"isha@121new",
                email:"isha@121new",
                password:"123",
                confirmedPassword:"13",
                age:21,
                institute:"IIT"
            })
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })
})



