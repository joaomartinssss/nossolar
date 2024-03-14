// import React from "react";

// const colunaEsquerda = () => {
//     const estiloDaColuna = {

//     }
// }

import React from "react";

const Categoria = () => {
  const style = {
    //   root: {
    //     '--amarelo-principal': '#f5e37f',
    //     '--azul-principal': '#003566',
    //     '--vermelho-opcional': '#e74c3c',
    //     '--amarelo-secundario': '#ffc300',
    //     '--header-height': '120px',
    //   },
    produtos: {
      display: "block",
      width: "200px",
      height: "100%",
      top: 0,
      left: 0,
      position: "fixed",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#003599",
      color: "aliceblue",
      borderRadius: "5px",
      padding: "20px",
    },
    button: {
      flexDirection: "column",
      borderRadius: "5px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#003599",
      color: "aliceblue",
      padding: "0.3rem 1rem",
      marginTop: "0.5rem",
      fontWeight: "bold",
      border: "none",
      width: "100%",
    },
    buttonHover: {
      flexDirection: "column",
      borderRadius: "5px",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(0, 191, 255)",
      color: "#003599",
      fontWeight: "bold",
      width: "100%",
    },
  };
  return (
    <section id="produtos" style={style.produtos}>
      <h2>Nossos Produtos</h2>
      <div className="botao-dos-produtos">
        <button style={style.button}>Bebidas</button>
        <button style={style.button}>Hortifruti</button>
        <button style={style.button}>Mercearia</button>
        <button style={style.button}>Açougue</button>
        <button style={style.button}>Rotisseria</button>
        <button style={style.button}>Laticínios</button>
        <button style={style.button}>Congelados</button>
        <button style={style.button}>Japonês</button>
        <button style={style.button}>Limpeza</button>
        <button style={style.button}>Higiene</button>
        <button style={style.button}>Churrasco</button>
        <button style={style.button}>Bomboniere</button>
        <button style={style.button}>Doces</button>
        <button style={style.button}>Bazar</button>
        <button style={style.button}>Automotivo</button>
        <button style={style.button}>Utilidades</button>
        <button style={style.button}>Padaria</button>
        <button style={style.button}>Frios</button>
        <button style={style.button}>Bebês</button>
        <button style={style.button}>Petshop</button>
        <button style={style.button}>Utilidades</button>
      </div>
    </section>
  );
};

export default Categoria;
