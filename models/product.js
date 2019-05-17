const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

module.exports = Product;