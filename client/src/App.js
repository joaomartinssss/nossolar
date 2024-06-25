import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Rodape from "./components/Rodape";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Category from "./components/Category";
import "./App.css";
import ProductPage from "./components/ProductPage";
import FinalizePurchase from "./components/FinalizePurchase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Delivery from "./components/Delivery";
import RetirarNaLoja from "./components/RetirarNaLoja";
import EntregarEmCasa from "./components/EntregarEmCasa";
import PageView from "./components/PageVIew";
import ClientArea from "./components/clientArea";
import ProductPage2 from "./components/ProductPage2";

const ScrollToTopButton = styled(Button)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  borderRadius: "50%",
  width: "50px",
  height: "60px",
});

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
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

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
    <Router>
      <div className="App">
        <TopNav
          setIsCartOpen={setIsCartOpen}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
        <div
          className="container"
          style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}
        >
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
        <Routes>
          <Route
            path="/FinalizePurchase"
            element={
              <FinalizePurchase
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/RetirarNaLoja" element={<RetirarNaLoja />} />
          <Route path="/ReceberEmCasa" element={<EntregarEmCasa />} />
          <Route path="/PageView" element={<PageView />} />
          <Route path="/AreaDoCliente" element={<ClientArea />} />
          <Route
            path="/ProductPage2"
            element={
              <ProductPage2 cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
