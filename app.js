require('dotenv').config();
const express = require('express');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const newsRoutes = require("./routes/newsRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(newsRoutes);
app.use(feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});