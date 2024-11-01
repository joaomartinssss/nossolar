import React, { useState, useEffect } from "react";
import TopNav from "./components/TopNav";
import ProductGrid from "./components/ProductGrid";
import CategoryProductGrid from "./components/CategoryProductGrid";
import Cart from "./components/Cart";
import Rodape from "./components/Rodape";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Category from "./components/Category";
import "./App.css";
import ProductPage2 from "./components/ProductPage2";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import RetirarNaLoja from "./components/RetirarNaLoja";
import EntregarEmCasa from "./components/EntregarEmCasa";
import DeliveryPage from "./components/DeliveryPage";
import ClientArea from "./components/clientArea";
import CreateProductPage from "./components/CreateProductPage";
import ProductControl from "./components/ProductControl";
import EditProduct from "./components/EditProduct";
import Payment from "./components/Payment";
import FinalizePurchase from "./components/FinalizePurchase";
import AdmPage from "./components/AdmPage";
import Order from "./components/OrderPage";
import HistoryPurchase from "./components/HistoryPurchase";
import ShowUserData from "./components/showUserData";
import PrivateRoute from "./components/PERMISSIONADM/PrivateRoute";
import ThanksPage from "./components/Obrigado";
import ReadyForPickup from "./components/ReadyForPickup";

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
  const [showProductCardButtons, setShowProductCardButtons] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [userId, setUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.id : null; //pega o ID do usuario do localStorage
  });

  const isAdmin = userId === 4; //verifica se o usuario é ADM

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://15.229.70.98:3001/products");
        if (!response.ok) {
          throw new Error("Falha ao carregar os produtos.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao obter os produtos:", error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path.startsWith("/categoria")) {
      setShowProductCardButtons(true);
    } else {
      setShowProductCardButtons(false);
    }
  }, [location]);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSpecialRoute = [
    "/Pagamento",
    "/RetirarNaLoja",
    "/ReceberEmCasa",
  ].includes(location.pathname);

  return (
    <div className="App">
      {!isSpecialRoute && (
        <>
          <TopNav
            setIsCartOpen={setIsCartOpen}
            cartItems={cartItems}
            setCartItems={setCartItems}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          <div
            className="container"
            style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}
          >
            <Category style={{ flexGrow: 1 }} />
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
              <Route
                path="/ProductPage2/:productId"
                element={
                  <ProductPage2
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                }
              />
              <Route
                path="/PedidosProntosParaRetirada"
                element={
                  <PrivateRoute
                    element={<ReadyForPickup />}
                    isAdmin={isAdmin}
                  />
                }
              />
              <Route path="/ShowUserData" element={<ShowUserData />} />
              <Route path="/HistoricoDeCompras" element={<HistoryPurchase />} />
              <Route path="/areaDoCliente" element={<ClientArea />} />
              <Route
                path="/PedidosPendentes"
                element={<PrivateRoute element={<Order />} isAdmin={isAdmin} />}
              />
              <Route
                path="/Delivery"
                element={
                  <PrivateRoute element={<DeliveryPage />} isAdmin={isAdmin} />
                }
              />
              <Route
                path="/ADM"
                element={
                  <PrivateRoute element={<AdmPage />} isAdmin={isAdmin} />
                }
              />
              <Route
                path="/createProduct"
                element={
                  <PrivateRoute
                    element={<CreateProductPage />}
                    isAdmin={isAdmin}
                  />
                }
              />
              <Route
                path="/ProductControl"
                element={
                  <PrivateRoute
                    element={<ProductControl />}
                    isAdmin={isAdmin}
                  />
                }
              />
              <Route
                path="/EditProduct/:productId"
                element={
                  <PrivateRoute element={<EditProduct />} isAdmin={isAdmin} />
                }
              />
              <Route
                path="/categoria/:categoryId"
                element={
                  <CategoryProductGrid
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    setShowProductCardButtons={setShowProductCardButtons}
                  />
                }
              />
              <Route path="obrigado" element={<ThanksPage />} />
            </Routes>
            {!selectedProduct && (
              <ProductGrid
                products={filteredProducts}
                addToCart={addToCart}
                onSelectProduct={setSelectedProduct}
                showProductCardButtons={showProductCardButtons}
                cartItems={cartItems}
              />
            )}
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
        </>
      )}

      {isSpecialRoute && (
        <Routes>
          <Route path="/Pagamento" element={<Payment />} />
          <Route path="/RetirarNaLoja" element={<RetirarNaLoja />} />
          <Route path="/ReceberEmCasa" element={<EntregarEmCasa />} />
        </Routes>
      )}
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
