import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Button, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const StyledUsersContainer = styled('div')({
    position: 'absolute',
    top: '450%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
});

const StyledButtonContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
});

const Users = ({ handleClose }) => {
    return (
        <Router>
            <StyledUsersContainer>
                <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, margin: '0 auto 1rem' }}>
                    <PersonIcon sx={{ fontSize: 48 }} />
                </Avatar>
                <Typography variant="h6" gutterBottom style={{color: 'black'}}>
                    Seja Bem-vindo!
                </Typography>
                <StyledButtonContainer>
                    <Link to="/login">
                        <Button variant="outlined" color="primary" style={{ marginBottom: '0.5rem' }}>
                            Entrar
                        </Button>
                    </Link>
                    <Link to="/cadastro">
                        <Button variant="outlined" color="primary" style={{ marginBottom: '0.5rem' }}>
                            Cadastrar
                        </Button>
                    </Link>
                    {/* <Button variant="contained" color="primary" onClick={handleClose}>
                        Fechar
                    </Button> */}
                </StyledButtonContainer>
            </StyledUsersContainer>
        </Router>
    );
};

export default Users;
