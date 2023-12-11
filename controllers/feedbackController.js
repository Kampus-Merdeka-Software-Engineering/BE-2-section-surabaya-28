const feedbackService = require("../services/feedbackService");

async function getAllFeedback(req, res) {
    const feedback = await feedbackService.getAllFeedback();
    res.json(feedback);
}

async function createFeedback(req, res) {
    const masukan = req.body;
    const createdFeedback = await feedbackService.createFeedback(masukan);
    res.status(201).json(createdFeedback);
}

module.exports = {
    getAllFeedback,
    createFeedback
};