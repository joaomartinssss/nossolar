import React from 'react';
import { IconButton, Typography, Grid, Button } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@material-ui/icons';

const Cart = ({ cartItems, setCartItems, setCartOpen }) => {
    const handleIncrement = (itemId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleDecrement = (itemId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleRemove = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    return (
        <div className="cart">
            <h2>Carrinho</h2>
            <Grid container spacing={2}>
                {cartItems.map((item, index) => (
                    <Grid item xs={10} key={item.id}>
                        <Grid container alignItems="center" spacing={2} style={{ borderBottom: index < cartItems.length - 1 ? '1px solid #ccc' : 'none' }}>
                            <Grid item xs={5}>
                                <Typography variant="body1" style={{ color: 'black' }}>{item.name}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <IconButton aria-label="Diminuir quantidade" onClick={() => handleDecrement(item.id)}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" style={{ color: 'black' }}>{item.quantity}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="Incrementar quantidade" onClick={() => handleIncrement(item.id)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="body1" style={{ color: 'black' }}>R$ {(item.price * item.quantity).toFixed(2)}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton aria-label="Remover item" onClick={() => handleRemove(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={() => setCartOpen(false)}>Fechar Carrinho</Button>
        </div>
    );
};

export default Cart;

