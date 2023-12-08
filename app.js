const express = require('express');
const { PrismaClient }  = require ('@prisma/client');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


const prisma = new PrismaClient()

app.use(bodyParser.json())

function LoggerMiddleware(req, res, next){
    console.log(`Request api received at: ${new Date()}`)
    next();
}


// endpoint get all newss
app.get('/news', async (req, res) => {
    const { keyword, search } = req.query;

    const result = await prisma.news.findMany();

    res.json({
        message: 'Get list all data News is succesfully',
        data: result
    })
})

app.use(LoggerMiddleware);


// endpoint get detail berita by id
app.get('/news/:id', async (req, res) => {
    const newsId = parseInt(req.params.id);
    const news = await prisma.news.findUnique({
    where: {
      news_id: newsId,
    },
  });
  
    if (!news) {
    // Berita dengan ID tertentu tidak ditemukan
    res.status(404).json({ message: 'Berita tidak ditemukan' });
    } else {
    // Berita dengan ID tertentu ditemukan
    res.json({ message: 'Berita ditemukan', data: news });
    }
});

// endpoint post news
app.post('/news', async (req, res) => {
    const {news_id, category_id, news_date, news_image, news_title, news_caption, news_content } = req.body;
        try {
        const newBerita = await prisma.news.create({
        data:{
            news_id,
            category_id, 
            news_date, 
            news_image, 
            news_title, 
            news_caption, 
            news_content
        }
    });

    res.json({ success: true, news: newBerita });
    } catch (err) {
    res.status(500).json({ success: false, error: err.message });
    }
})

// endpoint post feedback
app.post('/feedback', async (req, res) => {
    const {nama, email, telepon, masukan } = req.body;
    try {
        const newFeedback = await prisma.feedback.create({
            data:{
                nama,
                email,
                telepon,
                masukan
            }
        });
        
        res.json({ success: true, Feedback: newFeedback });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})

// endpoint get all feedback
app.get('/feedback', async (req, res) => {
    const { keyword, search } = req.query;

    const result = await prisma.feedback.findMany();

    res.json({
        message: 'Get list all data Feedback is succesfully',
        data: result
    })
})

// endpoint update news by id
app.put('/news/:id',async (req, res) => {
    const newsId = parseInt(req.params.id);
    const { category_id, news_date, news_image, news_title, news_caption, news_content } = req.body;
    const updatedNews = await prisma.news.update({
        where: {
            news_id: newsId,
        },
        data: {
            category_id, 
            news_date, 
            news_image, 
            news_title, 
            news_caption, 
            news_content,
            updated_at: new Date().toISOString() // Menggunakan waktu saat ini sebagai updated_at
        },
    });

    res.json({
        message: `Data news with ID ${newsId} has been successfully updated`,
        data: updatedNews,
    });
})

// endpoint delete customers by id
app.delete('/news/:id', async (req, res) => {
    const newsId = parseInt(req.params.id); // Mengonversi ID menjadi tipe data yang sesuai (biasanya integer)

        // Menggunakan Prisma Client untuk menghapus data berdasarkan ID
        const deletedNews = await prisma.news.delete({
            where: {
                id: newsId,
            },
        });
    res.json({
        message: `delete data news by id ${newsId} is successfully`,
        data: {}
    })
})

app.listen(port, () => {
    console.log(`example app listing on port http://localhost:${port}`);
})