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
  import ProductPage from "./components/ProductPage";
  import BlackOverlay from "./components/GreenOverlay";
  import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
  import RegisterPage from "./components/RegisterPage";
  import LoginPage from "./components/LoginPage";

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
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:3001/products");
          if (!response.ok) {
            throw new Error("Falha ao carregar os produtos.");
          }
          const data = await response.json();
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
            {!selectedProduct && (
              <ProductGrid
              products={products}
              addToCart={addToCart}
              onSelectProduct={setSelectedProduct}
              />
            )}
            {selectedProduct && <ProductPage product={selectedProduct} />}
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
          <Router>
            <Routes>
              <Route path="/FinalizePurchase" element={<BlackOverlay />} />
              <Route path="/cadastro" element={<RegisterPage />}/>
              <Route path="/login" element={<LoginPage />}/>
            </Routes>            
            {/* <BlackOverlay/> */}
          </Router>
        </div>      
    );
  }

  export default App;