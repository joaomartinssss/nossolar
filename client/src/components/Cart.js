import React, { useState } from 'react';
import { IconButton, Typography, Grid, Button } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@material-ui/icons';
import BlackOverlay from './GreenOverlay';

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
        const updatedCartItems = cartItems.filter(item => `${item.id}-${item.quantity}` !== itemId);
        setCartItems(updatedCartItems);
    };


    // Função para calcular o total
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Verificar se o carrinho está vazio
    const isEmptyCart = cartItems.length === 0;

    const [showBlackOverlay, setShowBlackOverlay] = useState(false);

    const handleFinalizarCompra = () => {
        // Definindo a tela preta após 3 segundos
        setTimeout(() => {
            setShowBlackOverlay(true);
        }, 1500);
    };

    return (
        <div className="cart" style={{ position: 'relative', paddingBottom: '3rem' }}>
            {isEmptyCart ? (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="/carrinho_vazio.png" alt="Imagem Carrinho Vazio" style={{ width: '20rem' }} />
                    <p style={{ color: 'black' }}>Carrinho vazio, que tal adicionar alguns itens?</p>
                    <Button variant="contained" color="primary" onClick={() => setCartOpen(false)}>Fechar Carrinho</Button>
                </div>
            ) : (
                <div>
                    <h2 color='#333'>Carrinho</h2>
                    <Grid container spacing={2}>
                        {cartItems.map((item, index) => (
                            <Grid item xs={12} key={item.id}>
                                <Grid container alignItems="center" spacing={1} style={{ borderBottom: index < cartItems.length - 1 ? '1px solid #ccc' : 'none' }}>
                                    <Grid item xs={1}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            overflow: 'hidden',
                                            borderRadius: '50%'
                                        }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1" style={{ color: 'black', marginLeft: '30px' }}>{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Grid container  alignItems="center">
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
                                    <Grid item xs={2}>
                                        <IconButton aria-label="Remover item" onClick={() => handleRemove(`${item.id}-${item.quantity}`)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems:"center"}}>
                            <Typography variant="h6" style={{
                                color: 'white', textAlign: 'left', marginTop: '1rem', background: '#333', width: 'fit-content', padding: '0.5rem 1rem', borderRadius: '5px' // Adicionando padding
                            }}>Total: R$ {calculateTotal().toFixed(2)}</Typography>
                            <Button variant="contained" 
                            style={{ 
                                background: 'green', 
                                color: 'white', 
                                marginLeft:'1rem', 
                                padding: '0.5rem 1rem', 
                                marginRight:'1.5rem'}}
                                onClick={handleFinalizarCompra}>Finalizar Compra
                                </Button>
                                <BlackOverlay show={showBlackOverlay}/>                        
                        </Grid>                        
                            
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            position: 'relative',
                            bottom: '1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: '999',
                            width: '90%',
                            maxWidth: '500px',
                            marginBottom: '1rem',
                            marginTop: '3rem'
                        }}
                        onClick={() => setCartOpen(false)}
                    >
                        Fechar Carrinho
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Cart;
