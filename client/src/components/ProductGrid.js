import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, addToCart }) => {
    return (
        <div style={{ position: 'absolute', right: '1rem', left: '20%' }}>
            <Grid container spacing={0}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        {/* Passe a função addToCart como propriedade para o componente ProductCard */}
                        <ProductCard product={product} addToCart={addToCart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductGrid;
