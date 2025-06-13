const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createSubmission,
  getSubmission,
} = require("../controllers/submissionController");
const auth = require("../middleware/auth");

router.post("/submissions", auth, upload.array("files"), createSubmission);
router.get("/submissions/:id", auth, getSubmission);

module.exports = router;
