const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: "Please enter valid email"
            }
        },
        unique: {
            args: true,
            msg: "The email has already been taken"
        }
    },
    resetToken: {
        type: Sequelize.STRING
    },
    tokenExpiration: {
        type: Sequelize.DATE
    }
});

module.exports = User;