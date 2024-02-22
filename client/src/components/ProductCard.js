import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductCard = ({ product, addToCart }) => {
    const [fontSize, setFontSize] = useState(1); // Font size state

    useEffect(() => {
        // Ajustar font size para caber no card
        const cardHeight = document.getElementById(`product-card-${product.id}`).offsetHeight;
        const contentHeight = document.getElementById(`product-card-content-${product.id}`).offsetHeight;
        const fontSizeRatio = cardHeight / contentHeight;
        setFontSize(fontSizeRatio > 1 ? 1 : fontSizeRatio); // Limitar tamanho máximo da fonte a 1
    }, [product.id]);

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card variant="outlined" id={`product-card-${product.id}`} style={{ height: '400px', overflow: 'hidden' }}>
            {/* Imagem */}
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px' }} />
            <CardContent id={`product-card-content-${product.id}`}>
                {/* Nome */}
                <Typography variant="h5" component="div" style={{ fontSize: `${fontSize}rem` }}>
                    {product.name}
                </Typography>
                {/* Preço */}
                <Typography variant="body1" color="textSecondary" style={{ fontSize: `${fontSize}rem` }}>
                    Valor: {product.price}
                </Typography>
                {/* Botão Adicionar */}
                <Button variant="contained" color="primary" onClick={handleAddToCart} style={{ borderRadius: '1rem', fontSize: `${fontSize}rem` }}>
                    Adicionar
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
