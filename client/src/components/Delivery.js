import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";

const Delivery = ({}) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Dados Pessoais</Typography>
          <Typography>{email.cliente}</Typography>
          <Typography>{nome.cliente}</Typography>
          <Typography>{telefone.cliente}</Typography>
        </CardContent>
        <CardContent>
          <Typography>Entrega</Typography>
          <Button onClick={DeliverInHouse}>Entregar em Casa</Button>
          <Button onClick={RetirarNaLoja}>Retirar na Loja</Button>
        </CardContent>
        <CardContent>{ResumoPedido}</CardContent>
      </Card>
    </div>
  );
};

export default Delivery;

const RetirarNaLoja = ({}) => {
  return (
    <div>
      <CardContent>
        <Typography>Retirar em:</Typography>
        <Button onClick={Vitapolis}>Vitápolis</Button>
        <Button onClick={Suburbano}>Suburbano</Button>
        <Button>Pagar</Button>
      </CardContent>
    </div>
  );
};

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
        <InputBase>{cliente.nome}</InputBase>
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
                <Typography>
                    Resumo do pedido
                </Typography>
                {/* a partir daqui, será igual ao carrinho porem com algumas diferenças
                nosso maior exemplo se chama Carrefour */}
                <Typography>Subtotal {total.pedido}</Typography>
                <Typography>Taxa de Serviço {/*preço da taxa de Serviço*/}</Typography>
                <Typography>Total {total.pedido + taxaDeServiço}</Typography>
            </CardContent>
        </div>
    )
}