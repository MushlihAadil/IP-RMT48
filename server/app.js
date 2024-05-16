const express = require('express');
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
    res.send('Selamat Datang, di Server Harry Potter API!');
  });

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use(require('./routers/index'));

// Cors Middleware
app.use(cors());

// Error Handler
app.use(require('./middleware/errorHandlers'));

module.exports = app;