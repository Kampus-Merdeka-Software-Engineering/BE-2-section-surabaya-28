const prisma = require("../config/prisma");
const newsService = require("../services/newsService");

async function getAllNews(req, res) {
    const news = await newsService.getAllNews();
    res.json(news);
}

async function getNewsById(req, res) {
    const newsId = parseInt(req.params.id);
    const news = await prisma.news.findUnique({
        where: {
            news_id: newsId,
        },
    });
    res.json(news);
}

async function createNews(req, res) {
    const berita = req.body;
    const createdNews = await newsService.createNews(berita);
    res.status(201).json(createdNews);
}

module.exports = {
    getAllNews,
    getNewsById,
    createNews
};