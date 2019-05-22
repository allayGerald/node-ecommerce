
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');  //where views are located default is /views
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404Page);

// Product.belongsTo(User, {
//     constraints: true,
//      onDelete: 'CASCADE', 
//      foreignKey: 'userId'
//     });
User.hasMany(Product);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });
