
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine',  'ejs');
app.set('views', 'views');  //where views are located default is /views
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);