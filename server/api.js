const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3001;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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
    const categoryId = req.params.categoryId;
    const { name, image, description, price } = req.body;
    const newProduct = { name, category_id: categoryId, image, description, price };
    connection.query('INSERT INTO products SET ?', newProduct, (error, results) => {
        if (error) {
            console.error('Erro ao inserir produto:', error);
            res.status(500).send('Erro ao criar produto');
            return;
        }
        newProduct.id = results.insertId;
        res.status(201).json(newProduct);
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

app.put('/categories/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const { name } = req.body;
    const updateCategory = { name };

    connection.query('UPDATE categories SET ? WHERE id = ?', [updateCategory, categoryId], (error, results) => {
        if (error) {
            console.error('Erro ao atualizar categoria:', error);
            res.status(500).send('Erro ao atualizar categoria');
            return;
        }
        res.status(200).json({ message: 'Categoria atualizada com sucesso' });
    });
});

app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).send('Erro ao buscar produtos');
            return;
        }
        res.json(results);
    });
});

app.put('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const { name, categoryId } = req.body;
    const updateProduct = { name, category_id: categoryId };

    connection.query('UPDATE products SET ? WHERE id = ?', [updateProduct, productId], (error, results) => {
        if (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).send('Erro ao atualizar produto');
            return;
        }
        res.status(200).json({ message: 'Produto atualizado com sucesso' });
    });
});

app.delete('/categories/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    connection.query('DELETE FROM categories WHERE id = ?', categoryId, (error, results) => {
        if (error) {
            console.error('Erro ao excluir categoria:', error);
            res.status(500).send('Erro ao excluir categoria');
            return;
        }
        res.status(200).json({ message: 'Categoria excluída com sucesso' });
    });
});

app.delete('/products/:productId', (req, res) => {
    const productId = req.params.productId;

    connection.query('DELETE FROM products WHERE id = ?', productId, (error, results) => {
        if (error) {
            console.error('Erro ao excluir produto:', error);
            res.status(500).send('Erro ao excluir produto');
            return;
        }
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    });
});

app.delete('/products/', (req, res) => {
    connection.query('DELETE FROM products', (error, results) => {
        if (error) {
            console.error('Erro ao excluir todos os produtos:', error);
            res.status(500).send('Erro ao excluir todos os produtos');
            return;
        }
        res.status(200).json({ message: 'Todos os produtos excluídos com sucesso' });
    });
});

app.delete('/products/:productId', (req, res) => {
    const productId = req.params.productId;

    connection.query('DELETE FROM products WHERE id = ?', productId, (error, results) => {
        if (error) {
            console.error('Erro ao excluir produto:', error);
            res.status(500).send('Erro ao excluir produto');
            return;
        }
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    });
});

app.put('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const { name, categoryId, image, description } = req.body;
    const updateProduct = { name, category_id: categoryId, image, description };
});



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
