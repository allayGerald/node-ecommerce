
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sequelize = require('./util/database');

// session config

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const csrf = require('csurf');

const sessionStore = new SequelizeStore({
    db: sequelize
});

const flash = require('connect-flash');

const app = express();

const csrfProtection = csrf();

// sessionStore.sync();

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.set('view engine', 'ejs');
app.set('views', 'views');  //where views are located default is /views
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// session connect before routes and bodyparser
app.use(session({
    secret: 'i1GOsABn1Nxd27J9zi5ovo1tvEMCiC0w',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
// call these after you initialize session
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => console.log(error))
});

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(authRoutes);
app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

app.listen(3000);
