import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, addToCart }) => {
    return (
        <Grid container className="product-grid-container" sx={{ marginTop: '20px', width: '50%', margin: '0 auto', marginBottom: '20px', background: '' }}>
            {products.map(product => (
                <Grid key={product.id} item xs={12} sm={6} md={3} lg={3} style={{ display: 'flex' }}>
                    {/* Passe a função addToCart como propriedade para o componente ProductCard */}
                    <ProductCard product={product} addToCart={addToCart} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;

