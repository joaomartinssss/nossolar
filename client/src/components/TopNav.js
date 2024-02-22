import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Cart from './Cart';

const SearchInput = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
}));

const CartContainer = styled('div')(({ theme, isOpen }) => ({
    position: 'fixed',
    boxSizing: 'border-box',
    top: 0,
    right: 0,
    zIndex: 999,
    padding: '2rem',
    width: '40vw', // 50% da largura da tela
    height: '100vh', // 100% da altura da tela
    backgroundColor: 'white',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)', // Sombra mais forte
    overflowY: 'auto',
    transition: 'transform 0.5s ease-in-out', // Adicionando uma transição suave
    transform: `translateX(${isOpen ? '0%' : '100%'})`, // Movendo o carrinho para a direita para escondê-lo
    color: '#333'
}));

const TopNav = ({ cartItems, setCartItems }) => { // Adicione setCartItems como uma propriedade
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleClickAway = () => {
        setIsCartOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <AppBar position="static" style={{ marginBottom: '1rem' }}>
                <Toolbar sx={{ justifyContent: 'space-between', padding: '.5rem 1rem' }}>
                    <div className="logo">Logo</div>
                    <SearchInput style={{padding: '.3rem 2rem'}}>
                        <SearchIconWrapper>
                            <SearchIcon color="primary"/>
                        </SearchIconWrapper>
                        <InputBase
                            placeholder="Pesquisar por produtos"
                            inputProps={{ 'aria-label': 'search' }}
                            style={{ paddingLeft: '2rem' }}
                        />
                    </SearchInput>
                    <div>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    aria-label="carrinho"
                                    onClick={handleCartClick}
                                >
                                    <ShoppingCartIcon />
                                </IconButton>
                                <CartContainer isOpen={isCartOpen}>
                                    <Cart cartItems={cartItems} setCartItems={setCartItems} setCartOpen={setIsCartOpen} />
                                </CartContainer>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    aria-label="conta"
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                            </div>
                        </ClickAwayListener>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopNav;
