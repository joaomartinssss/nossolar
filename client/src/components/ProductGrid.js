import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, addToCart }) => {
    return (
        <Grid container spacing={2} className="product-grid-container" sx={{ marginTop: '20px' }}>
            {products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    {/* Passe a função addToCart como propriedade para o componente ProductCard */}
                    <ProductCard product={product} addToCart={addToCart} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;

