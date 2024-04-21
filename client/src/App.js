import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Rodape from "./components/Rodape";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Category from "./components/Category";
import './App.css';

const ScrollToTopButton = styled(Button)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  borderRadius: "50%",
  width: "50px",
  height: "60px",
});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        if (!response.ok) {
          throw new Error("Falha ao carregar os produtos.");
        }
        const data = await response.json();
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...product, quantity: 1 },
    ]);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="App">
      <TopNav
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <div className="container" style={{ display: "flex", flexGrow: 1 }}>
        <Category style={{ flexGrow: 1 }} />
        <ProductGrid products={products} addToCart={addToCart} />
      </div>
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          setCartOpen={setIsCartOpen}
        />
      )}  
      <Rodape />
      <ScrollToTopButton
        onClick={scrollToTop}
        variant="contained"
        color="primary"
      >
        <ArrowUpwardIcon sx={{ fontSize: "30px" }} />
      </ScrollToTopButton>
    </div>
  );
}

export default App;
