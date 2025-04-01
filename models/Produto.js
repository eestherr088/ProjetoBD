// models/Produto.js
const Sequelize = require('sequelize');
const sequelize = require('../util/database'); // Importar a configuração do Sequelize

const Produto = sequelize.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Produto;