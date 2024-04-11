const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bl@ck100305",
    database: "nosso_lar_suburbano",
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

app.post('/categories', (req, res) => {
    const { name } = req.body;
    const newCategory = { name };
    connection.query('INSERT INTO categories SET ?', newCategory, (error, results) => {
        if (error) {
            console.error('Erro ao inserir categoria:', error);
            res.status(500).send('Erro ao criar categoria');
            return;
        }
        newCategory.id = results.insertId;
        res.status(201).json(newCategory);
    });
});

app.post('/categories/:categoryId/products', (req, res) => {
    const categoryId = req.params.categoriaId;
    const { name } = req.body;
    const newProduct = { name, category_id: category_id };
    connection.query('INSERT INTO products SET ?', newProduct, (error, results) => {
        if (error) {
            console.error('Erro ao inserir produto:', error);
            res.status(500).send('Erro ao criar produto');
            return;
        }
        newProduct.id = results.insertId;
        res.status(201).json(novoProduto);
    });
});

app.get('/categories', (req, res) => {
    connection.query('SELECT * FROM categories', (error, results) => {
        if (error) {
            console.error('Erro ao buscar categorias:', error);
            res.status(500).send('Erro ao buscar categorias');
            return;
        }
        res.json(results);
    });
});

app.get('/categories/:categoryId/products', (req, res) => {
    const categoryId = req.params.categoryId;
    connection.query('SELECT * FROM products WHERE category_id = ?', categoryId, (error, results) => {
        if (error) {
            console.error('Erro ao buscar produtos da categoria:', error);
            res.status(500).send('Erro ao buscar produtos da categoria');
            return;
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
