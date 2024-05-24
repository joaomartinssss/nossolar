import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@material-ui/core";
import InputBase from "@mui/material/InputBase";

const style = {
  CardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius:"5px"
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: "10px",
  },
  button: {
    margin: "10px",
  },
  inputBase: {
    border: "1px solid black",
    borderRadius: "3px",
    padding: "0px 3px 0px 3px",  // Add some padding so that the placeholder margin is visible
    backgroundColor: "#DBDDE6"
  },
};

function EntregarEmCasa() {
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
      <Typography style={style.text}>Insira o CEP:</Typography>
      <InputBase style={style.inputBase} placeholder="Ex: 06663-055"></InputBase>
        <Typography style={style.text}>Endereço para Entrega:</Typography>
        <Typography>Rua Sebastião Mamede - Conjunto Habitacional Setor D
          {/* Exibir aqui o nome da rua baseado em uma Rota
            que automaticamente mostre a rua baseado no CEP
            informado pelo usuário, peguei como exemplo o
            site do carrefour */}
        </Typography>
        <Typography style={style.text}>Número:</Typography>
        <InputBase style={style.inputBase} placeholder="Ex: 06663-055"></InputBase>
        <Typography style={style.text}>Complemento:</Typography>
        <InputBase style={style.inputBase} placeholder="Opcional"></InputBase>
        <Typography style={style.text}>Nome de quem vai receber:</Typography>
        <InputBase style={style.inputBase} placeholder="Ex:  José Martins"></InputBase>
        <Button variant="contained" sx={{marginTop:"20px"}}>Confirmar</Button>
      </CardContent>
    </div>
  );
}

export default EntregarEmCasa;
