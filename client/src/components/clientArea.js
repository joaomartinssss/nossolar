import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import breakPoints from "./BreakPoints";
import { useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./clientArea.css";
import InputMask from "react-input-mask";

const style = {
  card: {
    width: "90%",
    height: "95%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflowY: "auto",
  },
  typography: {
    fontWeight: "bold",
    borderRadius: "5px",
    border: "1px solid black",
    margin: "10px 1rem",
    background: "#DBDDE6",
    padding: "5px",
    width: "100%",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  personIcon: {
    fontSize: 30,
    color: "#324376",
  },
  cardContent: {
    border: "1px solid black",
    width: "40rem",
    height: "90%",
    margin: "1rem",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "1rem",
    alignItems: "center",
  },
};

function ClientArea() {
  const [userData, setUserData] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState({
    name: false,
    cep: false,
    telefone: false,
    endereco: false,
  });
  const [editData, setEditData] = useState({
    name: userData?.name || "",
    cep: userData?.cep || "",
    telefone: userData?.telefone || "",
    endereco: userData?.endereco || "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para controlar Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Estado para armazenar a mensagem da Snackbar

  // Função para iniciar ou encerrar o modo de edição
  const handleEditToggle = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Função para atualizar o valor de um campo editável
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/user/${userData.id}`,
        editData
      );
      setUserData(response.data); // Atualiza os dados exibidos com as alterações feitas
      setSnackbarMessage("Dados atualizados com sucesso!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
      setSnackbarMessage("Erro ao atualizar dados."); // Defina a mensagem de erro
      setSnackbarOpen(true); // Abra a Snackbar
    }
  };

  const isMobile = useMediaQuery(breakPoints.mobile);

  useEffect(() => {
    const userData = localStorage.getItem("user"); //Busque o usuario armazenado
    if (userData) {
      setUserData(JSON.parse(userData)); //Converta para JSON e atualize o estado
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      // Verifica se userData existe e tem o campo id
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/auth/user/${userData.id}` // Certifique-se de usar o campo id correto
          );
          setUserData(response.data); // Atualize o estado com os dados do servidor
        } catch (error) {
          console.error("Erro ao buscar dados do usuário", error);
        }
      };
      fetchData();
    }
  }, [userData]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = (confirm) => {
    setOpenConfirmDialog(false);
    if (confirm) {
      handleLogOut();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Função para fechar a Snackbar
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div
      style={{
        top: 0,
        left: 0,
        background: "#1976d2",
        width: "100%",
        height: "100%",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Card sx={style.card}>
        <Box sx={{ marginTop: "1rem", display: "flex", marginTop: "2rem" }}>
          <PersonIcon sx={{ fontSize: "2rem", color: "#003599" }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginLeft: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            Área do Cliente
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ ...style.cardContent }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", margin: "1rem" }}
            >
              Informações Pessoais:
            </Typography>
            <Typography
              variant="h6"
              style={{ ...style.typography, width: isMobile ? "60%" : "100%" }}
            >
              Nome:{" "}
              {editMode.name ? (
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                />
              ) : (
                userData.name
              )}
              <Button
                onClick={() => handleEditToggle("name")}
                sx={{ color: "#7C7C7C" }}
              >
                <EditIcon />
              </Button>
            </Typography>
            <Typography
              variant="h6"
              style={{ ...style.typography, width: isMobile ? "60%" : "100%" }}
            >
              CEP:{" "}
              {editMode.cep ? (
                <InputMask
                  mask=" 99999 - 999"
                  className="inputCep"
                  type="text"
                  name="cep"
                  value={editData.cep}
                  onChange={handleEditChange}
                />
              ) : (
                userData.cep
              )}
              <Button
                onClick={() => handleEditToggle("cep")}
                sx={{ color: "#7C7C7C" }}
              >
                <EditIcon />
              </Button>
            </Typography>
            <Typography
              variant="h6"
              style={{ ...style.typography, width: isMobile ? "60%" : "100%" }}
            >
              Telefone:{" "}
              {editMode.telefone ? (
                <InputMask
                  mask="(99) 99999 - 9999"
                  className="inputTelefone"
                  type="text"
                  name="telefone"
                  value={editData.telefone}
                  onChange={handleEditChange}
                />
              ) : (
                userData.telefone
              )}
              <Button
                onClick={() => handleEditToggle("telefone")}
                sx={{ color: "#7C7C7C" }}
              >
                <EditIcon />
              </Button>
            </Typography>
            <Typography
              variant="h6"
              style={{ ...style.typography, width: isMobile ? "60%" : "100%" }}
            >
              Email: {userData.email}
            </Typography>
            <Typography
              variant="h6"
              style={{ ...style.typography, width: isMobile ? "60%" : "100%" }}
            >
              CPF: {userData.cpf}
            </Typography>
            <Typography
              variant="h6"
              style={{ ...style.typography, width: isMobile ? "60%" : "100%" }}
            >
              Endereço:{" "}
              {editMode.endereco ? (
                <input
                  className="inputEndereco"
                  type="text"
                  name="endereco"
                  value={editData.endereco}
                  onChange={handleEditChange}
                />
              ) : (
                userData.endereco
              )}
              <Button
                onClick={() => handleEditToggle("endereco")}
                sx={{ color: "#7C7C7C" }}
              >
                <EditIcon />
              </Button>
            </Typography>
            {/* <Typography
              variant="h6"
              style={{ ...style.typography, width: isMobile ? "60%" : "100%" }}
            >
              Endereço: {userData.endereco}
            </Typography> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                width: "85%",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleSaveChanges}
                variant="contained"
                sx={{
                  background: "green",
                  marginTop: "0.5rem",
                  width: isMobile ? "20rem" : "100%",
                  margin: "1rem",
                  height: "3rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white", // Cor de fundo no hover
                    color: "green", // Cor do texto no hover
                    border: "1px solid green", // Cor da borda no hover
                    fontWeight: "bold",
                  },
                }}
              >
                Salvar Alterações
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "red",
                  marginTop: "0.5rem",
                  width: isMobile ? "60%" : "50%",
                  height: "3rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white", // Cor de fundo no hover
                    color: "red", // Cor do texto no hover
                    border: "1px solid red", // Cor da borda no hover
                    fontWeight: "bold",
                  },
                }}
                onClick={handleOpenConfirmDialog}
              >
                Sair
              </Button>
            </Box>
            {/* Diálogo de Confirmação */}
            <Dialog
              open={openConfirmDialog}
              onClose={() => handleCloseConfirmDialog(false)}
            >
              <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
                AVISO!
              </DialogTitle>
              <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => handleCloseConfirmDialog(false)}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent>
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                  Tem certeza que deseja sair da conta?
                </Typography>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: isMobile ? "center" : "center",
                }}
              >
                <Button
                  onClick={() => handleCloseConfirmDialog(true)}
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
                >
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
          <CardContent sx={style.cardContent}>
            <Link
              to={"/historicoDeCompras"}
              style={{
                width: isMobile ? "100%" : "100%",
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
                textDecoration: "none",
                marginBottom: isMobile ? "0.5rem" : "0",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  borderRadius: "5px",
                  border: "1px solid black",
                  background: "#DBDDE6",
                  padding: "5px",
                  width: isMobile ? "60%" : "100%",
                  boxSizing: "border-box",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Histórico de Compras
              </Typography>
            </Link>
            {/* <Link
              style={{
                width: isMobile ? "100%" : "100%",
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
                textDecoration: "none",
              }}
            > */}
            {/* <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  borderRadius: "5px",
                  border: "1px solid black",
                  background: "#DBDDE6",
                  padding: "5px",
                  width: isMobile ? "60%" : "100%",
                  boxSizing: "border-box",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "0.5rem",
                }}
              >
                Endereços Salvos
              </Typography> */}
            {/* </Link> */}
          </CardContent>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000} // Duração antes de fechar automaticamente
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
}

export default ClientArea;
