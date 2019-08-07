const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    storage: './session.sql'
});

module.exports = sequelize;