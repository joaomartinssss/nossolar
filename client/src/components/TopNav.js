import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/system';

// Estilo customizado para o input de pesquisa
const SearchInput = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center', // Adicionado para centralizar verticalmente
    width: 'auto',
}));

// Estilo customizado para o ícone de pesquisa
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    backgroundColor: '#f0f0f0', // Mesma cor de background do SearchInput
    borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`, // Adicionado para arredondar o canto superior esquerdo
}));

const TopNav = () => {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <div>
            <AppBar position="static" style={{ marginBottom: '1rem' }}> {/* Adicionando margem inferior à AppBar */}
                <Toolbar sx={{ justifyContent: 'space-between', padding: '.5rem 1rem' }}> {/* Adicionando padding interno à Toolbar */}
                    {/* Logo */}
                    <div className="logo">Logo</div>
                    {/* Pesquisar */}
                    <SearchInput style={{ padding: '.2rem 2rem' }}>
                        {/* Ícone de pesquisa dentro do SearchInput */}
                        <SearchIconWrapper>
                            <SearchIcon color="primary" />
                        </SearchIconWrapper>
                        <InputBase
                            placeholder="Pesquisar por produtos"
                            inputProps={{ 'aria-label': 'search' }}
                            style={{ paddingLeft: '2rem' }} // Adicionado para compensar a largura do ícone
                        />
                    </SearchInput>
                    {/* Carrinho e Login */}
                    <div>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="carrinho"
                            onClick={toggleCart}
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="conta"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {/* Carrinho Flutuante */}
            <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
                <div style={{ width: 250 }}>
                    {/* Conteúdo do Carrinho */}
                    <h2>Carrinho</h2>
                    <p>Item 1</p>
                    <p>Item 2</p>
                    <p>Item 3</p>
                </div>
            </Drawer>
        </div>
    );
};

export default TopNav;
