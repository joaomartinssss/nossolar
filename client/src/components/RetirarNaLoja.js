import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@material-ui/core";

const style = {
  CardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  text:{
    color: "black",
    fontWeight: "bold",
    margin:"10px"
  },
  button:{
    margin:"10px"
  }
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

export default RetirarNaLoja;
