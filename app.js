
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const sequelize = require('./util/database');

// session config

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
    db: sequelize
});


app.use(session({
    secret: 'i1GOsABn1Nxd27J9zi5ovo1tvEMCiC0w',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

sessionStore.sync();


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

app.use((req, res, next) => {
    const user = req.session.user;
    if (!user) {
        return next();
    }

    User.findByPk(user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => console.log(error)
        );

    // console.log(user);
    // if (user === undefined) {
    //     req.isLoggedIn = false;
    // } else {
    //     req.isLoggedIn = true;
    //     console.log(user);
    // }
    // next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

// sequelize.sync()
//     .then(result => {
//         return User.findAll({ limit: 1 });
//     })
//     .then(user => {
//         if (user.length === 0) {
//             User.create({ name: "Gerald", password: "!@#", email: "g@mail.com" });
//         }
//         return user;
//     })
//     .then(user => {
//         //    return user.createCart(); //create cart for thus user
//         app.listen(3000);
//     })
//     // .then(cart => {
//     //     app.listen(3000);
//     // })
//     .catch(error => {
//         console.log(error);
//     });
