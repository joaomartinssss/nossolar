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

const style = {
  backGround: {
    backgroundColor: "yellow",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: "10px",
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
    padding: "20px", // Espaçamento interno do Card
  },
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        senha,
      });
      // Armazene o token no localStorage
      localStorage.setItem("token", res.data.token);
      // Redirecionar o usuário para a página inicial após o login
      navigate("/");
    } catch (err) {
      console.error("Erro ao fazer login", err);
      alert("Email ou senha incorretos");
    }
  };

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
      }}
    >
      <Card style={style.card}>
        <CardContent style={style.cardContent}>
          <PersonIcon style={style.personIcon} />
          <Typography style={style.text}>Insira seu Email.</Typography>
          <InputBase
            style={style.inputBase}
            placeholder="user@exemplo.com..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></InputBase>
          <Typography style={style.text}>Insira sua Senha.</Typography>
          <InputBase
            style={style.inputBase}
            type="password"
            placeholder="Senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          ></InputBase>
          <Link to={""}>
            <Box>
              <Button style={{ marginBottom: "1rem", marginTop: "0" }}>
                Esqueci a Senha
              </Button>
            </Box>
          </Link>
          <Box>
            <Button
              variant="contained"
              style={{ ...style.button, background: "green" }}
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </Box>
          <Typography style={style.text}>Ainda não possui cadastro?</Typography>
          <Link to={"/cadastro"}>
            <Button variant="contained" style={{ ...style.button }}>
              Cadastre-se
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
