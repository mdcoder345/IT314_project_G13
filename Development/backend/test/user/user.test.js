const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index");
const { testCases } = require("./testCases");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("User", () => {
  let cookie;
  for (let index = 0; index < testCases.length; index++) {
    //register module
    describe("POST /register", () => {
      it("it should register user", (done) => {
        chai
          .request(app)
          .post("/register")
          .send(testCases[index][0])
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
          .send(testCases[index][1])
          .end((err, res) => {
            res.statusCode.should.equal(200);
            res.body.should.be.a("object");
            cookie = res.headers["set-cookie"][0];
            done();
          });
      });
    });
  }
});
