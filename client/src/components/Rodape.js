import React from "react";

const Rodape = () => {
  const estiloRodape = {
    position: "static",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#003599",
    color: "aliceblue",
    padding: "1rem",
    // margin: 0,
    textAlign: "center",
    display: "block",
    marginTop: "1rem",
  };

  return (
    <section style={estiloRodape}>
      <h2>Sobre o Supermercado</h2>
      <p>
        O Supermercado Nosso Lar é um estabelecimento familiar que oferece os
        melhores produtos da região aos nossos clientes.
      </p>
      <p>
        Nosso objetivo é proporcionar uma experiência de compras agradável e
        conveniente, com preços acessíveis e uma ampla variedade de opções.
      </p>
      <p>Suburbano: (11) 4142-8317</p>
      <p>Vitápolis: (11) 4141-2746</p>
      <footer>
        <p>&copy; 2024 Supermercado Nosso Lar</p>
      </footer>
    </section>
  );
};

export default Rodape;
