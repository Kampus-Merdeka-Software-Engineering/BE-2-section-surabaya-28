const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());
// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'newsportal',
});

// Terhubung ke database
db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

// Endpoint API untuk mendapatkan data dari database
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM news';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error saat query: ' + err.stack);
      res.status(500).send('Error saat mengambil data dari database');
      return;
    }

    res.json(results);
  });
});

// Array sederhana untuk menyimpan news
const news = [];

// Endpoint POST untuk menerima news
app.post('/api/news', (req, res) => {
    const query = 'SELECT * FROM news';
    const { news_id, category_id, news_date, news_image, news_title, news_caption, news_content } = req.body; // Mendapatkan data feedback dari body request

  // Mengecek apakah semua informasi yang diperlukan ada
  if (!news_id || !category_id || !news_date || !news_image || !news_title || !news_caption || !news_content) {
    return res.status(400).send('Mohon lengkapi semua informasi yang diperlukan.');
  }

  // Menambahkan berita ke dalam array
  const newNews = {
    news_id, 
    category_id, 
    news_date, 
    news_image, 
    news_title, 
    news_caption, 
    news_content
  };
  news.push(newNews);

  // Memberikan respons bahwa berita berhasil diterima
  res.send('Terima kasih sudah Mengirim Berita!');
});

// Endpoint GET untuk menampilkan semua berita yang telah diterima
app.get('/api/news', (req, res) => {
    res.json(news);
  });


// Array sederhana untuk menyimpan feedback
const feedbacks = [];

// Endpoint POST untuk menerima feedback
app.post('/api/feedback', (req, res) => {
    const query = 'SELECT * FROM feedback';
    const { nama, email, telepon, masukan } = req.body; // Mendapatkan data feedback dari body request

  // Mengecek apakah semua informasi yang diperlukan ada
  if (!nama || !email || !telepon || !masukan) {
    return res.status(400).send('Mohon lengkapi semua informasi yang diperlukan.');
  }

  // Menambahkan feedback ke dalam array
  const newFeedback = {
    nama,
    email,
    telepon,
    masukan
  };
  feedbacks.push(newFeedback);

  // Memberikan respons bahwa feedback berhasil diterima
  res.send('Terima kasih atas feedback Anda!');
});

// Endpoint GET untuk menampilkan semua feedback yang telah diterima
app.get('/api/feedback', (req, res) => {
    res.json(feedbacks);
  });

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});