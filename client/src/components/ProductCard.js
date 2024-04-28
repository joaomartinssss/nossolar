import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ProductCard = ({ product, addToCart, onSelectProduct }) => {
  const [fontSize, setFontSize] = useState(1); // Font size state

  useEffect(() => {
    // Ajustar font size para caber no card
    const cardHeight = document.getElementById(
      `product-card-${product.id}`
    ).offsetHeight;
    const contentHeight = document.getElementById(
      `product-card-content-${product.id}`
    ).offsetHeight;
    const fontSizeRatio = cardHeight / contentHeight;
    setFontSize(fontSizeRatio > 1 ? 1 : fontSizeRatio); // Limitar tamanho máximo da fonte a 1
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleClick = () => {
    onSelectProduct(product);
  };

  return (
    <Card
      variant="outlined"
      id={`product-card-${product.id}`}
      style={{ minHeight: "400px", width: "200px", overflow: "hidden" }}
    >
      {/* Imagem */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px, 10px, 10px, 10px",
        }}
      />
      <CardContent
        id={`product-card-content-${product.id}`}
        style={{ minHeight: "150px" }}
      >
        {/* Nome */}
        <Typography
          variant="h5"
          component="div"
          style={{
            fontSize: `${fontSize}rem`,
            fontFamily: "sans-serif",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {product.name}
        </Typography>
        {/* Preço */}
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ fontSize: `${fontSize}rem`, marginBottom: '10px'}}
        >
          Preço: R$ {product.price}
        </Typography>
        <Typography style={{ fontFamily: "sans-serif", fontWeight: "bold", marginBottom: '15px'}}>
          Descrição: {product.description}
        </Typography>
        {/* Botão Adicionar */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          style={{ borderRadius: "1rem", fontSize: `${fontSize}rem` }}
        >
          Adicionar
        </Button>
        <Button onClick={handleClick}>View Details</Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
