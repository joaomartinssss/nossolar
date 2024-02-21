import React, { useState } from 'react';
// import './App.css'; // Arquivo de estilos CSS (se você tiver)

import TopNav from './components/TopNav';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';

function App() {
    // Estado para armazenar os itens do carrinho
    const [cartItems, setCartItems] = useState([]);

    // Mock de dados de produtos
    const products = [
        { id: 1, name: 'Produto 1', price: 10.99, category: 'Alimentos', image: 'https://source.unsplash.com/random/360x120a' },
        { id: 2, name: 'Produto 2', price: 15.99, category: 'Eletrônicos', image: 'https://source.unsplash.com/random/360x120b' },
        // Adicione mais produtos conforme necessário
    ];

    // Função para adicionar um item ao carrinho
    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    return (
        <div className="App">
            <TopNav />
            <div className="container">
                <ProductGrid products={products} addToCart={addToCart} />
                <Cart cartItems={cartItems} />
            </div>
        </div>
    );
}

export default App;
