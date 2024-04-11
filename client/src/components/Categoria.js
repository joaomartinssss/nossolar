import React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Categoria = () => {
  const style = {
    produtos: {
      display: "block",
      width: "300px",
      height: "100%",
      top: 0,
      left: 0,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#003599",
      color: "aliceblue",
      borderRadius: "5px",
      padding: "20px",
    },
    buttonContainer: {
      width: "100%",
      marginBottom: "0.5rem",
    },
    button: {
      display: "block",
      borderRadius: "5px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#003599",
      color: "aliceblue",
      padding: "0.3rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      textDecoration: "none",
    },
    buttonHover: {
      backgroundColor: "rgb(0, 191, 255)",
      fontWeight: "bold",
    },
  };

  return (
    <section id="produtos" style={style.produtos}>
      <h2>Nossos Produtos</h2>
      <div className="botao-dos-produtos">
      <Router>
          <Link to="/hortifruti" style={style.button}>Hortifruti</Link>
          <Link to="/padaria" style={style.button}>Padaria</Link>
          <Link to="/acougue" style={style.button}>Açougue</Link>
          <Link to="/bebidas" style={style.button}>Bebidas</Link>
          <Link to="/rotisseria" style={style.button}>Rotisseria</Link>
          <Link to="/bomboniere" style={style.button}>Bomboniere</Link>
          <Link to="/bazar" style={style.button}>Bazar</Link>
          <Link to="/automotivo" style={style.button}>Automotivo</Link>
          <Link to="/mercearia" style={style.button}>Mercearia</Link>
          <Link to="/limpeza" style={style.button}>Limpeza</Link>
          <Link to="/laticinios" style={style.button}>Laticínios</Link>
          <Link to="/bebes" style={style.button}>Bebês</Link>
          <Link to="/higiene" style={style.button}>Higiene</Link>
          <Link to="/congelados" style={style.button}>Congelados</Link>
          <Link to="/japones" style={style.button}>Japonês</Link>
          <Link to="/churrasco" style={style.button}>Churrasco</Link>
          <Link to="/doces" style={style.button}>Doces</Link>
          <Link to="/utilidades" style={style.button}>Utilidades</Link>
          <Link to="/frios" style={style.button}>Frios</Link>
          <Link to="/petshop" style={style.button}>Petshop</Link>
        </Router>

      </div>
    </section>
  );
};

export default Categoria;
