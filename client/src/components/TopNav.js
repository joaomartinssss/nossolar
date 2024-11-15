import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";

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

const CartContainer = styled("div")(
  ({ theme, isOpen, isMobile, isTablet }) => ({
    position: "fixed",
    boxSizing: "border-box",
    top: 0,
    right: 0,
    zIndex: 999,
    padding: "2rem 1rem",
    width: isMobile ? "95%" : isTablet ? "96%" : "30vw",
    height: "100vh",
    backgroundColor: "white",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
    overflowY: "auto",
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(${isOpen ? "0%" : "100%"})`,
    color: "#333",
  })
);

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

const NavigationBar = styled("div")(({ isMobile, isTablet }) => ({
  backgroundColor: "red",
  padding: "0.8rem 0",
  textAlign: "center",
  display: "flex",
  overflowX: isMobile ? "auto" : "hidden",
  width: isMobile ? "108%" : isTablet ? "107vw" : "auto",
  justifyContent: isMobile ? "space-between" : "center",
}));

const NavLink = styled("a")({
  color: "white",
  textDecoration: "none",
  margin: "0 1rem",
  paddingLeft: "10px",
  paddingRight: "10px",
  borderRadius: "5px",
  "&:hover": {
    color: "white",
    backgroundColor: "#A40606",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "2px",
  },
  fontWeight: "bold",
});

const TopNav = ({
  cartItems,
  setCartItems,
  searchTerm,
  handleSearchChange,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [openUsersCard, setOpenUsersCard] = useState();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user"); //Busque o usuario armazenado
    if (userData) {
      setUserData(JSON.parse(userData)); //Converta para JSON e atualize o estado
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      // Verifica se userData existe e tem o campo id
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://products.nossolarsupermercado.com/api/auth/user/${userData.id}` // Certifique-se de usar o campo id correto
          );
          setUserData(response.data); // Atualize o estado com os dados do servidor
        } catch (error) {
          console.error("Erro ao buscar dados do usuário", error);
        }
      };
      fetchData();
    }
  }, [userData]);

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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const isMobile = useMediaQuery(breakPoints.mobile);
  const isTablet = useMediaQuery(breakPoints.tablet);

  return (
    <div style={{ position: "relative" }}>
      <NavigationBar isMobile={isMobile} isTablet={isTablet}>
        <NavLink href="" onClick={scrollToBottom}>
          Institucional
        </NavLink>
        <NavLink href="https://wa.me/5511940862140">Atendimento</NavLink>
        <NavLink href="" onClick={scrollToBottom}>
          Lojas
        </NavLink>
        <NavLink href="" onClick={scrollToBottom}>
          Folhetos
        </NavLink>
        <NavLink href="" onClick={scrollToBottom}>
          Trabalhe Conosco
        </NavLink>
      </NavigationBar>
      <AppBar
        position="static"
        style={{ width: isMobile ? "100%" : isTablet ? "101%" : "" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: ".5rem 1rem",
            background: "#003599", //mudança feita para teste
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexDirection: isMobile || isTablet ? "column" : "row",
            width: "100%",
          }}
        >
          <Link to={"/"}>
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: isTablet ? "2rem" : "1.5rem",
                marginBottom: isMobile || isTablet ? "1rem" : "0",
              }}
            >
              Supermercado Nosso Lar
            </div>
          </Link>
          <SearchInput
            style={{
              padding: ".2rem 5rem .2rem .1rem",
              marginBottom: isMobile || isTablet ? "1rem" : "0",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon
                style={{
                  cursor: "pointer",
                  fontSize: isTablet ? "2rem" : "default",
                }}
              />
            </SearchIconWrapper>
            <InputBase
              placeholder="Pesquisar por produtos"
              inputProps={{ "aria-label": "search" }}
              style={{
                paddingLeft: "2rem",
                padding: isMobile || isTablet ? "0.3rem 3rem" : "0.1rem 3rem",
              }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchInput>
          <div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  marginBottom: isMobile || isTablet ? "0.3rem" : "0",
                }}
              >
                <IconButton
                  size="large"
                  color="primary"
                  aria-label="carrinho"
                  onClick={handleCartClick}
                  style={{
                    color: "#D3D3D3",
                  }}
                >
                  <ShoppingCartIcon
                    style={{ fontSize: isTablet ? "2rem" : "1.5rem" }}
                  />
                  {totalItems > 0 && (
                    <CartIndicator>{indicatorContent}</CartIndicator>
                  )}
                </IconButton>
                <CartContainer isOpen={isCartOpen} isMobile={isMobile}>
                  <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    setCartOpen={setIsCartOpen}
                  />
                </CartContainer>
                <Link
                  to={userData && userData.name ? "/areaDoCliente" : "/login"}
                >
                  <IconButton
                    size="large"
                    color="primary"
                    aria-label="conta"
                    // onClick={handleUserPopupClick} // Adicione a função de clique no botão de conta
                    style={{
                      color: "#D3D3D3",
                      fontSize: isTablet ? "2rem" : "default",
                    }}
                  >
                    <span
                      style={{
                        marginRight: "0.5rem",
                        fontSize: isTablet ? "1.4rem" : "1rem",
                        marginLeft: "1rem",
                        color: "#D3D3D3",
                      }}
                    >
                      {userData && userData.name
                        ? userData.name
                        : "Entre ou cadastre-se"}
                    </span>
                    <AccountCircleIcon
                      style={{
                        fontSize: isTablet ? "2rem" : "1.5rem",
                      }}
                    />
                  </IconButton>
                </Link>
                {isUserPopupOpen && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Users handleClose={handleClose} />
                  </ClickAwayListener>
                )}
                {userData && userData.id === 4 && (
                  <Link to={"/adm"}>
                    <SettingsIcon
                      sx={{
                        color: "#D3D3D3",
                        fontSize: isTablet ? "2rem" : "1.5rem",
                        marginRight: isMobile ? "" : isTablet ? "" : "5rem",
                        margin: isMobile || isTablet ? "1rem" : "",
                      }}
                    />
                  </Link>
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
