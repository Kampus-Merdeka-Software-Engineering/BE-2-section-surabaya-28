const prisma = require("../config/prisma");

async function getAllNews(category) {
    try {
        let berita;

        if (category !== undefined) {
            berita = await prisma.news.findMany({
                where: {
                    category_id: category,
                },
                select: {
                    news_id: true,
                    news_date: true,
                    news_image: true,
                    news_title: true,
                    news_caption: true,
                    news_content: true,
                },
            });
        } else {
            berita = await prisma.news.findMany();        
        }
        return berita;
    } catch (err) {
        throw err;
    }
}

async function getNewsById(id) {
    try{
        berita.newsId = parseInt(berita.newsId);
        const newss = await prisma.news.findUnique({
            where: {
                news_id: newsId,
            },
        });
        if (!news) {
            // Berita dengan ID tertentu tidak ditemukan
            res.status(404).json({ message: 'Berita tidak ditemukan' });
            } else {
            // Berita dengan ID tertentu ditemukan
            res.json({ message: 'Berita ditemukan', data: newss });
            }
    } catch (err) {
        throw err;
    }
}

async function createNews(news) {
    try {
        berita.newsId = parseInt(berita.newsId);
        await prisma.news.create({
            data: news,
        });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllNews,
    getNewsById,
    createNews
};