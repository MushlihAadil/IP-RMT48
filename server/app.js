if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors Middleware
app.use(cors());

// Router
app.use(require('./routers/index'));

app.get('/', (req, res) => {
    res.send('Selamat Datang, di Server Harry Potter API!');
});

// Error Handler
app.use(require('./middleware/errorHandlers'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// module.exports = app;