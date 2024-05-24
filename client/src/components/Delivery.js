import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Link, Routes } from "react-router-dom";

const style = {
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  dados: {
    margin: "5px",
  },
  button: {
    margin: "10px",
  },
};

function RetirarNaLoja() {
  return (
    <div
      style={{
        background: "#78C0E0",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent style={style.CardContent}>
        <Typography style={style.text}>Retirar em:</Typography>
        <Box>
          <Button style={style.button} variant="contained">Vitápolis</Button>
          <Button style={style.button} variant="contained">Suburbano</Button>
        </Box>
        {/* <Button style={{backgroundColor:"green", marginTop:"15px"}} variant="contained">Pagar</Button> */}
      </CardContent>
    </div>
  );
}

const Delivery = ({}) => {
  return (
    <div
      style={{
        background: "#78C0E0",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardContent style={style.cardContent}>
          <Typography style={style.text} sx={{margin:"10px"}}>Dados Pessoais:</Typography>
          <Typography style={style.dados}>
            Email: joaozinho73@gmail.com
          </Typography>
          <Typography style={style.dados}>Nome: joaozinho martins</Typography>
          <Typography style={style.dados}>Telefone: (11) 98060-7358</Typography>
          {/* <Typography style={style.dados}>Cep: 06663-055</Typography> */}
        </CardContent>
        <CardContent style={style.cardContent}>
          <Typography style={style.text}>Opções de entrega:</Typography>
        </CardContent>
        <Box>
          <Button style={style.button} variant="contained">
            Entregar em Casa
          </Button>
          <Link to={"/RetirarNaLoja"}>
            <Button style={style.button} variant="contained">
              Retirar na Loja
            </Button>
          </Link>
        </Box>        
        <CardContent>{ResumoPedido}</CardContent>
      </Card>
    </div>
  );
};

export default Delivery;

// const RetirarNaLoja = ({}) => {
//   return (
//     <div>
//       <CardContent>
//         <Typography>Retirar em:</Typography>
//         <Button onClick={Vitapolis}>Vitápolis</Button>
//         <Button onClick={Suburbano}>Suburbano</Button>
//         <Button>Pagar</Button>
//       </CardContent>
//     </div>
//   );
// };

const AfterCep = (event) => {
  return (
    <div>
      <CardContent>
        <Typography>Endereço para Entrega</Typography>
        <Typography>
          {/* Exibir aqui o nome da rua baseado em uma Rota
          que automaticamente mostre a rua baseado no CEP
          informado pelo usuário, peguei como exemplo o
          site do carrefour */}
        </Typography>
        <Typography>Número</Typography>
        <InputBase></InputBase>
        <Typography>Complemento</Typography>
        <InputBase placeholder="Opcional"></InputBase>
        <Typography>Destinatário</Typography>
        <InputBase>nomde do cliente</InputBase>
      </CardContent>
    </div>
  );
};

const DeliverInHouse = ({}) => {
  return (
    <div>
      <CardContent>
        <Typography>CEP </Typography>
        <InputBase
          placeholder="Insira seu CEP..."
          onChange={AfterCep}
        ></InputBase>
      </CardContent>
    </div>
  );
};

const Suburbano = ({}) => {
  return (
    <div>
      <CardContent>
        <Typography>Nosso Lar Suburbano</Typography>
        <Typography>
          Av. Lizete Geralda Calandrini Guimarães, 57 - Parque Suburbano,
          Itapevi - SP
        </Typography>
      </CardContent>
    </div>
  );
};

const Vitapolis = ({}) => {
  return (
    <div>
      <CardContent>
        <Typography>Nosso Lar Vitápolis</Typography>
        <Typography>
          R. Cecília Pereira Alves, 105 - Jardim Vitapolis, Itapevi - SP
        </Typography>
      </CardContent>
    </div>
  );
};

const ResumoPedido = ({}) => {
  return (
    <div>
      <CardContent>
        <Typography>Resumo do pedido</Typography>
        {/* a partir daqui, será igual ao carrinho porem com algumas diferenças
                nosso maior exemplo se chama Carrefour */}
        <Typography>Subtotal total do pedido</Typography>
        <Typography>Taxa de Serviço {/*preço da taxa de Serviço*/}</Typography>
        <Typography>Total total do pedido + taxaDeServiço</Typography>
      </CardContent>
    </div>
  );
};
