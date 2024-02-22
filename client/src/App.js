// App.js
import React, { useState } from 'react';
import TopNav from './components/TopNav';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const products = [
        { id: 1, name: 'Drops Halls Extra Forte Caixeta com 21 unidades', price: 23.90, category: 'Alimentos', image: 'https://source.unsplash.com/random/360x120a' },
        { id: 2, name: 'Drops Halls Morango Caixeta com 21 unidades', price: 23.90, category: 'Eletrônicos', image: 'https://source.unsplash.com/random/360x120b' },
        { id: 3, name: 'Drops Halls Menta Caixeta com 21 unidades', price: 23.90, category: 'Eletrônicos', image: 'https://source.unsplash.com/random/360x120b' },
        { id: 4, name: 'Bala de Goma Dort Gomets Frutas Sortidas', price: 15.50, category: 'Eletrônicos', image: 'https://source.unsplash.com/random/360x120b' },
        // Adicione mais produtos conforme necessário
    ];

    const addToCart = (product) => {
        setCartItems(prevCartItems => [...prevCartItems, { ...product, quantity: 1 }]);
    };

    return (
        <div className="App">
            <TopNav setIsCartOpen={setIsCartOpen} cartItems={cartItems} setCartItems={setCartItems} /> {/* Passando setCartItems */}
            <div className="container">
                <ProductGrid products={products} addToCart={addToCart} />
                {isCartOpen && <Cart cartItems={cartItems} setCartItems={setCartItems} setCartOpen={setIsCartOpen} />}
            </div>
        </div>
    );
}

export default App;
