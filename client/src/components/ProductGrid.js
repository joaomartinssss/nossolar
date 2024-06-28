import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, addToCart, onSelectProduct, showProductCardButtons }) => {
    return (
        <Grid container className="product-grid-container" sx={{ marginTop: '20px', width: '80%', margin: '0 auto', marginBottom: '20px', background: '#CDD1DE' }}>
            {products.map(product => (
                <Grid key={product.id} item xs={12} sm={6} md={2} lg={2} style={{ display: 'flex' }}>
                    {/* Passe a função addToCart como propriedade para o componente ProductCard */}
                    <ProductCard product={product} addToCart={addToCart} onSelectProduct={onSelectProduct} showButtons={showProductCardButtons}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;

