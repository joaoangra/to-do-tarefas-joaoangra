require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./src/router');

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('API respondendo em http://localhost:' + PORT);
});
