const Course = require("../../models/Course");

//first one refers the new object to be created and the second one referes the updated one
const testCases = [
  [
    {
      creatorName: "creator1",
      courseContentDescription: "test content1",
      videoLink: "www.video1.com/watch",
      documentLink: "www.doc1.com/view",
    },
    {
      creatorName: "creator1.1",
      courseContentDescription: "test content1.1",
      videoLink: "www.video1.com/watch/1",
      documentLink: "www.doc1.com/view/1",
    },
  ],
  [
    {
      creatorName: "creator2",
      courseContentDescription: "test content2",
      videoLink: "www.video2.com/watch",
      documentLink: "www.doc2.com/view",
    },
    {
      creatorName: "creator2.1",
      courseContentDescription: "test content2.1",
      videoLink: "www.video1.com/watch/2",
      documentLink: "www.doc1.com/view/2",
    },
  ],
];

const course = `644a0ad6482fbf92d2dcf1f5`;

module.exports = { testCases, course };
