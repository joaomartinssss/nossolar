import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const style = {
  card: {
    // marginBottom: "10rem",
    // display: "flex",
    // flexDirection: "column",
    // height: "auto",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    position: "relative",
    // paddingBottom: "2rem",
    // marginTop:"10rem"
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: "10px",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    marginRight: "10px",
  },

  spacer: {
    flexGrow: 1, // This will take up the remaining space and push the button down
  },
  personIcon: {
    fontSize: 50,
    marginBottom: 20,
    color: "#B1B5C8",
  },
  inputBase: {
    border: "1px solid black",
    borderRadius: "3px",
    padding: "0px 3px 0px 3px", // Add some padding so that the placeholder margin is visible
    backgroundColor: "#DBDDE6",
  },
  grid: {
    margin: "10px",
  },
};

function BlackOverlay() {
  return (
    <div
      style={{
        background: "#78C0E0",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Card style={style.card} sx={{marginTop:"10rem", marginBottom:"3rem"}}>
        <CardContent style={style.cardContent}>
          <Typography
            variant="h6"
            style={{ color: "black", margin: "2rem", fontWeight: "bold" }}
          >
            Supermercado Nosso Lar
          </Typography>
          <Grid style={style.grid}>
            <div>produto 1</div>
          </Grid>
          <Grid style={style.grid}>
            <div>produto 2</div>
          </Grid>
          <Grid style={style.grid}>
            <div>produto 3</div>
          </Grid>
          <Grid style={style.grid}>
            <div>produto 4</div>
          </Grid>         
          <div style={style.spacer} />
          <Button
            style={style.button}
            variant="contained"
            sx={{ marginBottom: "2rem", marginRight: "0", marginTop:"2rem" }}
          >
            Confirmar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default BlackOverlay;
