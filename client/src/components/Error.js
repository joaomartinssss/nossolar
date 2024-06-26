import React from "react";
import "./Error.css"; // Certifique-se de incluir os estilos CSS que você forneceu
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Typography } from "@mui/material";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-msg">
      <ErrorOutlineIcon className="icon-error"/>
      <Typography>ERRO AO CARREGAR PRODUTO!</Typography>
    </div>
  );
};

export default ErrorMessage;
