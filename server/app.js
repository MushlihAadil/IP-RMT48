if (process.env.NODE_ENV!== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors Middleware
app.use(cors())

app.get('/', (req, res) => {
    res.send('Selamat Datang, di Server Harry Potter API!')
  });
  

app.listen(port, () => {
    console.clear();
    console.log(`Example app listening on port ${port}`)
});

module.exports = app