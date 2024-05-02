import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";



const registerPage = ({}) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Cadastre-se no Supermercado Nosso Lar</Typography>
          <Typography>Insira seu Nome e Sobrenome:</Typography>
          <InputBase placeholder="Exemplo: José Silva"></InputBase>
          <Typography>Insira seu CEP:</Typography>
          <InputBase placeholder="Insira seu CEP aqui"></InputBase>
          <Typography>Insira seu Email:</Typography>
          <InputBase placeholder="joaozinho@exemplo.com..."></InputBase>
          <Typography>Confirme seu Email:</Typography>
          <InputBase placeholder="joaozinho@exemplo.com..."></InputBase>
          <Typography>Insira sua Senha:</Typography>
          <InputBase placeholder="Senha..."></InputBase>
          <Typography>Confirme sua Senha:</Typography>
          <InputBase placeholder="Senha..."></InputBase>
          <Button>Confirmar</Button>
        </CardContent>
      </Card>
    </div>
  );
};

const usersPage = ({}) => {
  return (
    <div>
      <Card style={{ backgroundColor: "" }}>
        <CardContent style={{ borderRadius: "5px" }}>
          <PersonIcon></PersonIcon>
          <Typography>Insira seu Email.</Typography>
          <InputBase placeholder="joaozinho@exemplo.com..."></InputBase>
          <Typography>Insira sua Senha.</Typography>
          <InputBase placeholder="Senha..."></InputBase>
          <Button>Esqueci a Senha</Button>
          <Button>Entrar</Button>
          <Button>Cadastre-se</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default usersPage;
