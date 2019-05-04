
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine',  'pug');
app.set('views', 'views'); //where views are located default is /views
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('error-404', {pageTitle: 'Error 404'});
});

app.listen(3000);