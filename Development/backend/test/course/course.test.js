const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index");
const expect = chai.expect;
const should = chai.should();
const Course = require("../../models/Course");
const { testCases } = require("./testCases");
chai.use(chaiHttp);

describe("Testing Course", () => {
  for (let index = 0; index < testCases.length; index++) {
    let cookie;
    //login module
    describe("POST /login", () => {
      it("it should login user", (done) => {
        console.log(`\nRunning testcase: #${index + 1}\n`);
        chai
          .request(app)
          .post("/login")
          .send({
            username_email: "kavan",
            password: "kavan",
          })
          .end((err, res) => {
            res.statusCode.should.equal(200);
            res.body.should.be.a("object");
            cookie = res.headers["set-cookie"][0];
            done();
          });
      });
    });

    //read course module
    describe("GET /courses", () => {
      it("it should read courses", (done) => {
        chai
          .request(app)
          .get("/courses")
          .set("Cookie", cookie)
          .end((err, res) => {
            res.statusCode.should.equal(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    //add course module
    describe("POST /courses", () => {
      it("it should add courses", (done) => {
        chai
          .request(app)
          .post("/courses")
          .set("Cookie", cookie)
          .send(testCases[index][0])
          .end((err, res) => {
            res.statusCode.should.equal(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    //update course
    describe("PATCH /courses/:id", () => {
      it("it should update course", (done) => {
        Course.findOne(testCases[index][0]).then((res) => {
          chai
            .request(app)
            .patch(`/courses/${res._id.toString()}`)
            .set("Cookie", cookie)
            .send(testCases[index][1])
            .end((err, res) => {
              res.statusCode.should.equal(200);
              res.body.should.be.a("object");
              done();
            });
        });
      });
    });

    //delete course
    describe("DELETE /courses/:id", () => {
      it("it should delete course", (done) => {
        Course.findOne(testCases[index][1]).then((res) => {
          chai
            .request(app)
            .delete(`/courses/${res._id.toString()}`)
            .set("Cookie", cookie)
            .end((err, res) => {
              res.statusCode.should.equal(200);
              res.body.should.be.a("object");
              done();
            });
        });
      });
    });
  }
});
