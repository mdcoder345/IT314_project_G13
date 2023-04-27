const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index");
const expect = chai.expect;
const should = chai.should();
const CourseContent = require("../../models/CourseContent");
const { testCases, course } = require("./testCases");
const courseContent = require("../../models/CourseContent");
chai.use(chaiHttp);

describe("Testing Course Content", () => {
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

    //read all contents module
    describe("GET /courses/view", () => {
      it("it should read contents of a course", (done) => {
        chai
          .request(app)
          .get(`/courses/view/${course}`)
          .set("Cookie", cookie)
          .end((err, res) => {
            res.statusCode.should.equal(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    //add content module
    describe("POST /courses/add/:id", () => {
      it("it should add content", (done) => {
        chai
          .request(app)
          .post(`/courses/add/${course}`)
          .set("Cookie", cookie)
          .send(testCases[index][0])
          .end((err, res) => {
            res.statusCode.should.equal(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    //update content
    describe("PATCH /courses/update/:id", () => {
      it("it should update content", (done) => {
        courseContent.findOne(testCases[index][0]).then((res) => {
          chai
            .request(app)
            .patch(`/courses/update/${res._id.toString()}`)
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

    //delete content
    describe("DELETE /courses/delete/:id", () => {
      it("it should delete content", (done) => {
        courseContent.findOne(testCases[index][1]).then((res) => {
          chai
            .request(app)
            .delete(`/courses/delete/${res._id.toString()}`)
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
