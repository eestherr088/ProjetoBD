// util/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('catalogo_artesanato', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;