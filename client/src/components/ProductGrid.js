import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
    return (
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
            {products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;
