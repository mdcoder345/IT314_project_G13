const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);


describe("Course",()=>{
    //add course module
    describe("POST /courses",()=>{
        it("it should add course",(done)=>{
            chai
            .request(app)
            .get("/courses")
            .end((err,res)=>{
                console.log(res);
                res.statusCode.should.equal(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

    //update course
    describe("PATCH /courses/:id",()=>{
        it("it should update course",(done)=>{
            chai
            .request(app)
            .patch("/courses/:id")
            .send({
                courseName:"DSA",
                courseDescription:"Data Structures and Algorithms"
            })
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

    //delete course
    describe("DELETE /courses/:id",()=>{
        it("it should delete course",(done)=>{
            chai
            .request(app)
            .delete("/courses/:id")
            .end((err,res)=>{
                res.statusCode.should.equal(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

})