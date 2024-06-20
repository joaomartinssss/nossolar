import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Categoria = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const style = {
    produtos: {
      display: "flex",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "red",
      color: "aliceblue",
      padding: "5px",
      overflowX: "auto",
    },
    button: {
      display: "flex",
      borderRadius: "5px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      color: "white",
      fontWeight: "bold",
      padding: "0.3rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      textDecoration: "none",
    },
    buttonHover: {
      backgroundColor: "#A40606",
      fontWeight: "bold",
    },
  };

  return (
    <section id="produtos" style={style.produtos}>
      <Router>
        {[
          "hortifruti",
          "padaria",
          "acougue",
          "bebidas",
          "rotisseria",
          "bomboniere",
          "bazar",
          "automotivo",
          "mercearia",
          "limpeza",
          "laticinios",
          "bebes",
          "higiene",
          "congelados",
          "japones",
          "churrasco",
          "doces",
          "utilidades",
          "frios",
          "petshop",
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
      </Router>
    </section>
  );
};

export default Categoria;
