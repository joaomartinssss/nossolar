// App.js
import React, { useState } from "react";
import TopNav from "./components/TopNav";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Rodape from "./components/Rodape";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Drops Halls Extra Forte Caixeta com 21 unidades",
      price: 23.9,
      category: "Alimentos",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 2,
      name: "Drops Halls Morango Caixeta com 21 unidades",
      price: 23.9,
      category: "Eletrônicos",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-morango-28g-embalagem-com-21-unidades/efacil/4301072/a3e8b6fc6b9b36a30df97ed520796061.jpeg",
    },
    {
      id: 3,
      name: "Drops Halls Menta Caixeta com 21 unidades",
      price: 23.9,
      category: "Eletrônicos",
      image:
        "https://a-static.mlcdn.com.br/800x560/halls-menta-28gr-com-21-unidades-adams/olistsp/osp0vulidogm0n7a/b77e6492ef1be320fcaa2715cab0216e.jpeg",
    },
    {
      id: 4,
      name: "Bala de Goma Dort Gomets Frutas Sortidas",
      price: 15.5,
      category: "Eletrônicos",
      image:
        "https://a-static.mlcdn.com.br/800x560/bala-goma-dori-30-tubos-gomets-32g-frutas-sortidas-960g/sparmazem/16045031497/a7d3f2867a1d8c832c0d1d0a13dad0be.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    {
      id: 5,
      name: "Halls preta exemplo",
      price: 17.34,
      category: "peixaria",
      image:
        "https://a-static.mlcdn.com.br/450x450/bala-halls-extra-forte-275g-embalagem-com-21-unidades/efacil/4301075/177376eae44a94f742a75d632a788281.jpeg",
    },
    // { id: 5, name: 'teste', price: 15.50, category: 'Eletrônicos', image: 'teste' },
    // Adicione mais produtos conforme necessário
  ];

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...product, quantity: 1 },
    ]);
  };

  return (
    <div className="App">
      <TopNav
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />{" "}
      {/* Passando setCartItems */}
      <div className="container">
        <ProductGrid products={products} addToCart={addToCart} />
        {isCartOpen && (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            setCartOpen={setIsCartOpen}
          />
        )}
      </div>

      <Rodape />
    </div>
  );
}

export default App;
