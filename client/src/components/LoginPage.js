import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";

const style = {
  backGround: {
    backgroundColor: "yellow",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: "10px",
    marginBottom: "1.5rem",
    marginTop: "1.5rem",
  },
  button: {
    color: "white",
    marginRight: "10px",
    marginLeft: "10px",
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
    border: "1px solid #324376",
    borderRadius: "3px",
    padding: "0px 3px 0px 3px", // Add some padding so that the placeholder margin is visible
    backgroundColor: "#DBDDE6",
  },
  card: {
    backgroundColor: "white", // Cor do Card
    padding: "60px", // Espaçamento interno do Card
  },
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const isMobile = useMediaQuery(breakPoints.mobile);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://products.nossolarsupermercado.com/api/auth/login",
        {
          email,
          senha,
        }
      );
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Salva o usuário
        localStorage.setItem("userId", res.data.user.id);

        setSuccessMessage("Login realizado com sucesso!");
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert("Erro no login. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao fazer login", err);
      localStorage.clear(); // Limpar qualquer dado de login anterior
      alert("Email ou senha incorretos");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div
      style={{
        background: "#CDD1DE",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={style.card}>
        <CardContent style={style.cardContent}>
          <Typography
            variant={isMobile ? "h5" : "h5"}
            sx={{
              fontWeight: "bold",
              marginBottom: "1rem",
              fontSize: isMobile ? "1.5rem" : "2rem",
              textAlign: "center",
            }}
          >
            Entre no Supermercado Nosso Lar
          </Typography>
          <PersonIcon style={style.personIcon} />
          <Typography style={style.text}>Insira seu Email.</Typography>
          <InputBase
            style={{
              ...style.inputBase,
              width: isMobile ? "300px" : "250px",
              height: isMobile ? "50px" : "40px",
              padding: "1rem",
            }}
            placeholder="user@exemplo.com..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></InputBase>
          <Typography style={style.text}>Insira sua Senha.</Typography>
          <InputBase
            style={{
              ...style.inputBase,
              width: isMobile ? "300px" : "250px",
              height: isMobile ? "50px" : "40px",
              padding: "1rem",
            }}
            type="password"
            placeholder="Senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          ></InputBase>
          <Link to={""}>
            <Box>
              <Button
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Esqueci a Senha
              </Button>
            </Box>
          </Link>
          <Box>
            <Button
              variant="contained"
              style={{
                ...style.button,
                background: "green",
                width: isMobile ? "350px" : "250px",
                height: isMobile ? "50px" : "40px",
                fontWeight: "bold",
              }}
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </Box>
          <Typography style={style.text}>Ainda não possui cadastro?</Typography>
          <Link to={"/cadastro"}>
            <Button
              variant="contained"
              style={{
                ...style.button,
                width: isMobile ? "350px" : "250px",
                height: isMobile ? "50px" : "40px",
                fontWeight: "bold",
              }}
            >
              Cadastre-se
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
