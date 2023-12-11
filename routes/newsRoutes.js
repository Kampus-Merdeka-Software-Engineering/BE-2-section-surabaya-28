const express = require('express');
const router = express.Router();

const newsController = require("../controllers/newsController");

router.get("/news", newsController.getAllNews);
router.get("/news/:id", newsController.getNewsById);
router.post("/news", newsController.createNews);

module.exports = router;