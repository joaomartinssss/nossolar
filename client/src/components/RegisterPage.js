import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

const style = {
  card: {
    margin: "2rem 0",
    overflow: "auto",
    padding: "0 10rem",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: "10px",
  },
  button: {
    color: "white",
    marginRight: "10px",
    fontFamily: "sans-serif",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  personIcon: {
    fontSize: 50,
    marginBottom: 20,
    color: "#324376",
  },
  inputBase: {
    border: "1px solid black",
    borderRadius: "3px",
    padding: "0px 3px 0px 3px", // Add some padding so that the placeholder margin is visible
    backgroundColor: "#DBDDE6",
    border: "1px solid #324376",
  },
  // textField: {
  //   padding: "0px 3px 0px 3px",
  //   width: "100%",
  // },
};

function registerPage() {
  return (
    <div
      style={{
        background: "#78C0E0",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card style={style.card}>
        <CardContent style={style.cardContent}>
          <PersonIcon style={style.personIcon} />
          <Typography style={style.text} variant="h5">
            Cadastre-se no Supermercado Nosso Lar
          </Typography>
          <Typography style={style.text}>Insira seu Nome completo:</Typography>
          <InputBase
            style={style.inputBase}
            placeholder="Ex: José Silva de Silva"
          ></InputBase>
          <Typography style={style.text}>Insira seu CEP:</Typography>
          <InputMask
            mask="99999 - 999"
            style={{ ...style.inputBase, padding: "0.5rem" }}
            placeholder="Insira seu CEP aqui..."
          ></InputMask>
          <Typography style={style.text}>Insira seu telefone</Typography>
          <InputMask
            mask="(99) 99999 - 9999"
            style={{ ...style.inputBase, padding: "0.5rem" }}
            placeholder="(11) 91234 - 5678"
          ></InputMask>
          <Typography style={style.text}>Insira seu Email:</Typography>
          <InputBase
            style={style.inputBase}
            placeholder="user@exemplo.com..."
          ></InputBase>
          <Typography style={style.text}>Insira sua Senha:</Typography>
          <InputBase
            style={style.inputBase}
            type="password"
            placeholder="Senha..."
          ></InputBase>
          <Typography style={style.text}>Insira seu CPF:</Typography>
          <InputMask
            mask="999.999.999-99"
            style={{ ...style.inputBase, padding: "0.5rem" }}
            placeholder="Ex: 123.456.789-00"
          ></InputMask>
          <Typography style={style.text}>
            Insira sua data de nascimento:
          </Typography>
          <InputBase
            style={style.inputBase}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          ></InputBase>
          <Button
            variant="contained"
            style={{ ...style.button, background: "green" }}
            sx={{ marginTop: "15px" }}
          >
            Confirmar
          </Button>
          <Typography style={style.text} sx={{ marginTop: "20px" }}>
            Possui Cadastro?
          </Typography>
          <Box>
            <Link to={"/login"}>
              <Button
                style={style.button}
                sx={{ marginBottom: "20px", marginTop: "10px" }}
                variant="contained"
              >
                Acesse sua conta
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default registerPage;
