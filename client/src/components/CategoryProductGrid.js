import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import TopNav from "./TopNav";
import Rodape from "./Rodape";
import Categoria from "./Category";

function CategoryProductGrid({
  cartItems,
  setCartItems,
  setShowProductCardButtons,
}) {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/categories/${categoryId}/products`
        );
        if (!response.ok) {
          throw new Error("Falha ao carregar categoria.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Erro ao obter categorias:", error);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  useEffect(() => {
    setShowProductCardButtons(false);
    return () => setShowProductCardButtons(true);
  }, [setShowProductCardButtons]);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { ...product, quantity: 1 },
    ]);
  };

  return (
    <div
      style={{
        background: "#CDD1DE",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <TopNav cartItems={cartItems} setCartItems={setCartItems} />
      <Categoria />
      <Grid
        container
        className="product-grid-container"
        sx={{
          marginTop: "20px",
          width: "80%",
          margin: "0 auto",
          marginBottom: "20px",
          background: "#CDD1DE",
        }}
      >
        {products.map((product) => (
          <Grid
            key={product.id}
            item
            xs={12}
            sm={6}
            md={2}
            lg={2}
            style={{ display: "flex" }}
          >
            <ProductCard
              product={product}
              addToCart={handleAddToCart}
              showButtons={true}
            />
          </Grid>
        ))}
      </Grid>
      <Rodape />
    </div>
  );
}

export default CategoryProductGrid;
