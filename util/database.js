const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+3:00',
    storage: './session.sql'
});

module.exports = sequelize;