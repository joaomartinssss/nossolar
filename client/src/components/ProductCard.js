// ProductCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductCard = ({ product, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card variant="outlined">
            {/* Imagem */}
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '350px' }} />
            <CardContent>
                {/* Nome */}
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                {/* Preço */}
                <Typography variant="body1" color="textSecondary">
                    Valor: {product.price}
                </Typography>
                {/* Botão Adicionar */}
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                    Adicionar
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
