import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Categoria = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const containerRef = useRef(null);

  const style = {
    container: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    produtos: {
      display: "flex",
      width: "100%",
      height: "100%",
      overflowX: "auto",
      scrollBehavior: "smooth",
      padding: "5px",
      backgroundColor: "gold",
      color: "aliceblue",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "gold",
      color: "#003599",
      fontWeight: "bold",
      padding: "0.3rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      textDecoration: "none",      
    },
    buttonHover: {
      backgroundColor: "gold",
      fontWeight: "bold",
    },
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      border: "none",
      padding: "0.5rem",
      cursor: "pointer",
      zIndex: 1,
    },
    leftButton: {
      left: 0,
      background: "none",
      color: "#003599",
      borderRadius: "50px",
    },
    rightButton: {
      right: 0,
      background: "none",
      color: "#003599",
      borderRadius: "50px",      
    },
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 100;
    }
  };

  return (
    <div style={style.container}>
      {/* <KeyboardDoubleArrowLeftIcon
        style={{ ...style.navButton, ...style.leftButton }}
        onClick={scrollLeft}
      ></KeyboardDoubleArrowLeftIcon> */}
      <section id="produtos" style={style.produtos} ref={containerRef}>
        {[
          "hortifruti",
          "padaria",
          "açougue",
          "bebidas",
          "rotisseria",
          "bomboniere",
          "bazar",
          "automotivo",
          "petshop",
          "mercearia",
          "limpeza",
          "laticinios",
          "bebes",
          "higiene",
          "congelados",
          "utilidades",
          "japones",          
        ].map((category) => (
          <Link
            key={category}
            to={`/${category}`}
            style={
              hoveredButton === category
                ? { ...style.button, ...style.buttonHover }
                : style.button
            }
            onMouseEnter={() => setHoveredButton(category)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </section>
      {/* <KeyboardDoubleArrowRightIcon
        style={{ ...style.navButton, ...style.rightButton }}
        onClick={scrollRight}
      ></KeyboardDoubleArrowRightIcon> */}
    </div>
  );
};

export default Categoria;
