import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      backgroundColor: "gold",
      color: "aliceblue",
      padding: "5px",      
      // overflowX: "auto",
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
  };

  return (
    <section id="produtos" style={style.produtos}>
      {[
        "hortifruti",
        "padaria",
        "açougue",
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
        // "frios",
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
    </section>
  );
};

export default Categoria;
