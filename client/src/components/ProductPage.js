import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useStyles = makeStyles({
  productPage: {
    display: "flex",
    // alignItems: 'center',
    // justifyContent: 'center',
    width: "100%",
    // background: "green"
  },
  productContainer: {
    display: "flex",
    marginLeft: "3rem",
    alignItems: "center",
    // backgroundColor: 'yellow', // Set a background color for the container
    justifyContent: "space-between",
    // flexDirection: 'row', // Align items horizontally
    maxWidth: "800px", // Adjust the maximum width if needed
  },
  productImage: {
    width: "400px", // Set a fixed width for the image
    marginRight: "20px", // Adjust the margin to create space between the image and details
  },
  productDetails: {
    flex: 1, // Allow the details to grow to fill available space
    textAlign: "left", // Align text to the left
  },
});

const ProductPage = ({ product, history }) => {
  const classes = useStyles();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.productPage}>
      <Card>
        <CardContent className={classes.productContainer}>        
          <IconButton onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <div className={classes.productDetails}>
            <img
              src={product.image}
              alt={product.name}
              className={classes.productImage}
              style={{ border: "solid 5px #D8DDDE" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "2.5rem", fontWeight: "700", color: "#333" }}
            >
              R$ {product.price.toFixed(2)}
            </Typography>
            <Button variant="contained" style={{ backgroundColor: "gold" }}>
              Adicionar ao Carrinho
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
