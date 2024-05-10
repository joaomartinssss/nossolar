import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Cart from "./Cart";
import Users from "./users";

const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  width: "auto",
  "&:focus-within": {
    border: "2px solid blue",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  right: 0,
  backgroundColor: "blue", //mudança feita para teste, cor original azul
  borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
}));

const CartContainer = styled("div")(({ theme, isOpen }) => ({
  position: "fixed",
  boxSizing: "border-box",
  top: 0,
  right: 0,
  zIndex: 999,
  padding: "2rem 1rem",
  width: "30vw",
  height: "100vh",
  backgroundColor: "white",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
  overflowY: "auto",
  transition: "transform 0.5s ease-in-out",
  transform: `translateX(${isOpen ? "0%" : "100%"})`,
  color: "#333",
}));

const CartIndicator = styled("div")({
  position: "absolute",
  top: -8,
  right: -8,
  backgroundColor: "green",
  borderRadius: "50%",
  width: 20,
  height: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: 12,
});

const NavigationBar = styled("div")({
  backgroundColor: "red",
  padding: "0.8rem 0",
  textAlign: "center",
});

const NavLink = styled("a")({
  color: "white",
  textDecoration: "none",
  margin: "0 1rem",
  paddingLeft: "10px",
  paddingRight: "10px",
  borderRadius: "5px",
  "&:hover": {
    color: "white",
    backgroundColor: "#003599",
    paddingBottom: "30px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    borderRadius: "6px",
  },
  fontWeight: "bold",
});

const TopNav = ({ cartItems, setCartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [openUsersCard, setOpenUsersCard] = useState();

  const handleClose = () => {
    setOpenUsersCard(false);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClickAway = () => {
    setIsCartOpen(false);
    setIsUserPopupOpen(false);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const indicatorContent = totalItems > 9 ? "9+" : totalItems;

  const handleUserPopupClick = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  };

  return (
    <div style={{ position: "relative" }}>
      <NavigationBar>
        <NavLink href="#">Institucional</NavLink>
        <NavLink href="#">Atendimento</NavLink>
        <NavLink href="#">Nossas Lojas</NavLink>
        <NavLink href="#">Folhetos</NavLink>
        <NavLink href="#">Trabalhe Conosco</NavLink>
      </NavigationBar>
      <AppBar position="static" style={{ marginBottom: "1rem" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: ".5rem 1rem",
            background: "#003599", //mudança feita para teste
          }}
        >
          <div
            className="logo"
            style={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Seja Bem-vindo ao Supermercado Nosso Lar
          </div>
          <SearchInput style={{ padding: ".2rem 5rem .2rem .1rem" }}>
            <SearchIconWrapper>
              <SearchIcon style={{ cursor: "pointer" }} />
            </SearchIconWrapper>
            <InputBase
              placeholder="Pesquisar por produtos"
              inputProps={{ "aria-label": "search" }}
              style={{ paddingLeft: "2rem" }}
            />
          </SearchInput>
          <div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="carrinho"
                  onClick={handleCartClick}
                  style={{ color: "#D3D3D3" }}
                >
                  <ShoppingCartIcon />
                  {totalItems > 0 && (
                    <CartIndicator>{indicatorContent}</CartIndicator>
                  )}
                </IconButton>
                <CartContainer isOpen={isCartOpen}>
                  <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    setCartOpen={setIsCartOpen}
                  />
                </CartContainer>
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="conta"
                  onClick={handleUserPopupClick} // Adicione a função de clique no botão de conta
                  style={{ color: "#D3D3D3" }}
                >
                  <span
                    style={{
                      marginRight: "0.5rem",
                      fontSize: "1rem",
                      marginLeft: "1rem",
                      color: "#D3D3D3",
                    }}
                  >
                    Entre ou cadastre-se
                  </span>
                  <AccountCircleIcon />
                </IconButton>
                {isUserPopupOpen && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Users handleClose={handleClose} />
                  </ClickAwayListener>
                )}
              </div>
            </ClickAwayListener>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNav;
