import React from "react";
import { Typography } from "@mui/material";

function BlackOverlay() {
  return (
    <div
      style={{
        background: "green",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        width: "100%",
        display: "block",
      }}
      >
      <Typography variant="h6"style={{color: "white", margin: "2rem", fontWeight:"bold"}}>Supermercado Nosso Lar</Typography>
    </div>
  );
}

export default BlackOverlay;
