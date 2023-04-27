const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("User", () => {
  //register module
  describe("POST /register", () => {
    it("it should register user", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          username: "kavan",
          email: "kavan@gmail.com",
          password: "kavan",
          confirmedPassword: "kavan",
          age: 20,
          institute: "DA",
        })
        .end((err, res) => {
          res.statusCode.should.equal(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //login module
  describe("POST /login", () => {
    it("it should login user", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          username_email: "User",
          password: "User@13",
        })
        .end((err, res) => {
          res.statusCode.should.equal(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
