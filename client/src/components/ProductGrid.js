import React from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";

const ProductGrid = ({
  products,
  addToCart,
  onSelectProduct,
  showProductCardButtons,
  cartItems = [],
}) => {
  const isMobile = useMediaQuery(breakPoints.mobile);
  const isTablet = useMediaQuery(breakPoints.tablet);
  
  return (
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
          xs={isMobile ? 6 : isTablet ? 4 : 12} // Adjust for mobile, tablet, and desktop
          sm={isTablet ? 4 : isMobile ? 6 : 12} // Handle both mobile and tablet breakpoints
          md={4} // Maintain 4 cards per column on larger screens
          lg={3} // 3 cards per column on desktops (new)
          style={{ display: "flex" }} // Ensure consistent styling
        >
          <ProductCard
            product={product}
            addToCart={addToCart}
            onSelectProduct={onSelectProduct}
            showButtons={showProductCardButtons}
            cartItems={cartItems}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
