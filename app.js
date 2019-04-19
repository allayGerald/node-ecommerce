const http = require('http');

const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('First Middleware');
    next(); // Allows calling next middleware
})

app.use((req, res, next) => {
    res.send('<h1>EXPRESS!!</h1>');
})

http.createServer(app).listen('3000');