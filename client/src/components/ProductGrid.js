import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, addToCart, onSelectProduct }) => {
    return (
        <Grid container className="product-grid-container" sx={{ marginTop: '20px', width: '80%', margin: '0 auto', marginBottom: '20px', background: '#E8E5DA' }}>
            {products.map(product => (
                <Grid key={product.id} item xs={12} sm={6} md={2} lg={2} style={{ display: 'flex' }}>
                    {/* Passe a função addToCart como propriedade para o componente ProductCard */}
                    <ProductCard product={product} addToCart={addToCart} onSelectProduct={onSelectProduct}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;

