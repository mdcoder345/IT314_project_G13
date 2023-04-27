//first one refers the new object to be created and the second one referes the updated one
const testCases = [
  [
    {
      courseName: "testCourse1",
      courseDescription: "test content1",
    },
    {
      courseName: "testCourse1.1",
      courseDescription: "test content 1.1",
    },
  ],
  [
    {
      courseName: "testCourse2",
      courseDescription: "test content2",
    },
    {
      courseName: "testCourse1.1",
      courseDescription: "test content 2.1",
    },
  ],
];

module.exports = { testCases };
