const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Course", () => {
  let cookie;
  //login module
  describe("POST /login", () => {
    it("it should login user", (done) => {
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
        .send({
          courseName: "DSA",
          courseDescription: "Data Structures and Algorithms",
        .get("/courses")
        .send({
        })
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
      chai
        .request(app)
        .patch("/courses/:id")
        .set("Cookie", cookie)
        .send({
          courseName: "Dev-ops",
          courseDescription: "Development Operations infinite cycle",
        })
        .end((err, res) => {
          res.statusCode.should.equal(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //delete course
  describe("DELETE /courses/:id", () => {
    it("it should delete course", (done) => {
      chai
        .request(app)
        .delete("/courses/:id")
        .set("Cookie", cookie)
        .end((err, res) => {
          res.statusCode.should.equal(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
