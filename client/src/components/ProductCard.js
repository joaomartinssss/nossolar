import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart, onSelectProduct }) => {
  const [fontSize, setFontSize] = useState(1); // Font size state
  const navigate = useNavigate();

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

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
  };

  const handleClick = () => {
    onSelectProduct(product);
    navigate(`/ProductPage2/${product.id}`);
  };

  return (
    <Card
      variant="outlined"
      id={`product-card-${product.id}`}
      style={{
        minHeight: "400px",
        width: "200px",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "5px",
        margin: ".5rem",
      }}
      onClick={handleClick}
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
        style={{
          minHeight: "150px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div>
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
            {product.name.length > 30
              ? `${product.name.substring(0, 30)}...`
              : product.name}
          </Typography>

          {/* Preço */}
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ fontSize: `${fontSize}rem`, marginBottom: "10px" }}
          >
            R$ {product.price}
          </Typography>
          {/* <Typography style={{ fontFamily: "sans-serif", fontWeight: "bold", marginBottom: '15px'}}>
          {product.description.length > 30 ? `${product.description.slice(0, 30)}...` : product.description}
        </Typography> */}

          {/* Botão Adicionar */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            style={{
              fontSize: `${fontSize}rem`,
              width: "100%",
              background: "#003599",
            }}
          >
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
