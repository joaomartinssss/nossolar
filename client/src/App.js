import React, { useState } from 'react';
import TopNav from './components/TopNav';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const products = [
        { id: 1, name: 'Produto 1', price: 10.99, category: 'Alimentos', image: 'https://source.unsplash.com/random/360x120a' },
        { id: 2, name: 'Produto 2', price: 15.99, category: 'Eletrônicos', image: 'https://source.unsplash.com/random/360x120b' },
        // Adicione mais produtos conforme necessário
    ];

    const addToCart = (product) => {
        setCartItems(prevCartItems => [...prevCartItems, { ...product, quantity: 1 }]);
    };

    return (
        <div className="App">
            <TopNav setIsCartOpen={setIsCartOpen} cartItems={cartItems} />
            <div className="container">
                <ProductGrid products={products} addToCart={addToCart} />
                {isCartOpen && <Cart cartItems={cartItems} setCartItems={setCartItems} setCartOpen={setIsCartOpen} />}
            </div>
        </div>
    );
}

export default App;
