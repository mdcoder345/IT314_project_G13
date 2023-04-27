const Course = require("../../models/Course");

//first one refers the new object to be created and the second one referes the updated one
const testCases = [
  [
    {
      username: "abc1111",
      email: "abc1111@gmail.com",
      password: "Abcd@1234",
      confirmedPassword: "Abcd@1234",
      age: 20,
      institute: "DA",
    },
    {
      username_email: "abc1111",
      password: "Abcd@1234",
    },
  ],
  [
    {
      username: "xyz1111",
      email: "xyz1111@gmail.com",
      password: "Xyzw@1234",
      confirmedPassword: "Xyzw@1234",
      age: 20,
      institute: "DA",
    },
    {
      username_email: "xyz1111",
      password: "Xyzw@1234",
    },
  ],
];

module.exports = { testCases };
