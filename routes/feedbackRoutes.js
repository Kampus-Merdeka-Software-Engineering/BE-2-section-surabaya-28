const express = require('express');
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");

router.get("/feedback", feedbackController.getAllFeedback);
router.post("/feedback", feedbackController.createFeedback);

module.exports = router;