
const express = require('express');
const app = express();

app.use('/about', (req, res, next) => {
   res.send('<h1>This is about page</h1>');
})

app.use('/', (req, res, next) => {
    res.send('<h1>EXPRESS!!</h1>');
})

app.listen(3000);