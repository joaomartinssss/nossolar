import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

function PageViewProducts() {
  return (
    <div
      style={{
        background: "#78C0E0",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "90%",
          height: "90%",
          margin: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", margin: "1rem", textAlign: "center" }}
        >
          Em Preparo:
        </Typography>
        <Grid
          sx={{
            margin: "2rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "black",
              alignItems: "center",
              padding: "10px 35%",
              border: "1px solid blue",
              ":hover": {
                backgroundColor: "#E5E7E6",
                border: "1px solid blue",
                color: "blue",
              },
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", margin: "1rem", textAlign: "center" }}
            >
              Pedido #092
            </Typography>
          </Button>
        </Grid>
      </Card>
      <Card
        sx={{
          width: "90%",
          height: "90%",
          margin: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", margin: "1rem" }}>
          Pronto para Entrega:
        </Typography>
        <Grid
          sx={{
            margin: "2rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "black",
              alignItems: "center",
              padding: "10px 35%",
              border: "1px solid blue",
              ":hover": {
                backgroundColor: "#E5E7E6",
                border: "1px solid blue",
                color: "blue",
              },
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", margin: "1rem", textAlign: "center" }}
            >
              Pedido #092
            </Typography>
          </Button>
        </Grid>
      </Card>
    </div>
  );
}
export default PageViewProducts;
