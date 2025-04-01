// app.js ou server.js
const sequelize = require('./util/database'); // Importar a configuração do Sequelize
const Produto = require('./models/Produto'); // Importar o Model
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
sequelize.sync()
    .then(result => {
        // Aplicação rodando aqui
        console.log('Tabelas criadas/sincronizadas com sucesso!');
    })
    .catch(err => {
        console.log(err);
    });
// app.js ou server.js


// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos (CSS, imagens, etc.)

// Rotas
app.get('/', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('produtos/lista', { produtos: produtos });
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao listar produtos');
    }
});

app.get('/produto/:id', async (req, res) => {
    const produtoId = req.params.id;
    try {
        const produto = await Produto.findByPk(produtoId);
        if (produto) {
            res.render('produtos/detalhes', { produto: produto });
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao buscar produto');
    }
});

app.get('/novo', (req, res) => {
    res.render('produtos/novo');
});

app.post('/novo', async (req, res) => {
    const { nome, descricao, preco, imagem } = req.body;
    try {
        await Produto.create({
            nome: nome,
            descricao: descricao,
            preco: preco,
            imagem: imagem
        });
        res.redirect('/'); // Redirecionar para a lista de produtos
    } catch (err) {
        console.log(err);
        res.status(500).send('Erro ao criar produto');
    }
});
sequelize.sync()
.then(result => {
// Aplicação rodando aqui
app.listen(3000, () => {
console.log('Servidor rodando na porta 3000');
});
})
.catch(err => {
console.log(err);
});