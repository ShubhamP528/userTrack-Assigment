const express = require("express");
const router = express.Router();
const { topUsers, filesReport } = require("../controllers/analyticsController");

router.get("/analytics/top-users", topUsers);
router.get("/analytics/files-report", filesReport);

module.exports = router;
