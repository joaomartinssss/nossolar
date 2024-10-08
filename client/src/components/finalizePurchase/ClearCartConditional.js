import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";

function OpenDialog({ openDialog, handleCloseDialog, HandleclearCart }) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {"AVISO!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}
        >
          Você realmente deseja deletar o carrinho? Essa ação não pode ser
          desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            background: "red",
            marginBottom: "0.5rem",
            fontWeight: "bold",
            color: "white",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "white", // Cor de fundo no hover
              color: "red", // Cor do texto no hover
              border: "1px solid red", // Cor da borda no hover
              fontWeight: "bold",
            },
          }}
          onClick={handleCloseDialog}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            HandleclearCart(); // Deleta o carrinho
            handleCloseDialog(); // Fecha o modal
          }}
          sx={{
            background: "#1976d2",
            marginBottom: "0.5rem",
            fontWeight: "bold",
            color: "white",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "white", // Cor de fundo no hover
              color: "#1976d2", // Cor do texto no hover
              border: "1px solid #1976d2", // Cor da borda no hover
              fontWeight: "bold",
            },
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OpenDialog;
