import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { useMediaQuery } from "@mui/material";
import breakPoints from "./BreakPoints";

const style = {
  card: {
    margin: "2rem 0",
    overflow: "auto",
    padding: "0 10rem",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    margin: "1.2rem",
    textAlign: "center  ",
  },
  button: {
    color: "white",
    marginRight: "10px",
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
    border: "1px solid black",
    borderRadius: "3px",
    padding: "0px 3px 0px 3px", // Add some padding so that the placeholder margin is visible
    backgroundColor: "#DBDDE6",
    border: "1px solid #324376",
  },
  // textField: {
  //   padding: "0px 3px 0px 3px",
  //   width: "100%",
  // },
};

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    senha: "",
    cep: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://products.nossolarsupermercado.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("registro bem-sucedido");
        navigate.push("/login");
      } else {
        alert(data.msg || "erro ao registrar");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário", error);
      alert("Erro ao registrar usuário");
    }
  };

  const isMobile = useMediaQuery(breakPoints.mobile);

  return (
    <div
      style={{
        background: "#CDD1DE",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: isMobile ? "108vh" : "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card style={style.card}>
        <CardContent style={style.cardContent}>
          <PersonIcon style={style.personIcon} />
          <Typography style={{ ...style.text, width: "120%" }} variant="h5">
            Cadastre-se no Supermercado Nosso Lar
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography style={style.text}>
                Insira seu Nome completo:
              </Typography>
              <InputBase
                style={{
                  ...style.inputBase,
                  padding: isMobile ? "0 0.5rem" : "0.5rem",
                  width: isMobile ? "250px" : "100%",
                  height: isMobile ? "40px" : "40px",
                  textAlign: isMobile ? "center" : "",
                }}
                placeholder="Ex: José Silva de Silva"
                name="name"
                value={formData.name}
                onChange={handleChange}
              ></InputBase>
              <Typography style={style.text}>Insira seu CEP:</Typography>
              <InputMask
                mask="99999 - 999"
                style={{
                  ...style.inputBase,
                  padding: isMobile ? "0 1rem" : "0.5rem",
                  width: isMobile ? "200px" : "100%",
                  height: isMobile ? "40px" : "",
                  textAlign: isMobile ? "center" : "",
                }}
                placeholder="Insira seu CEP aqui..."
                name="cep"
                value={formData.cep}
                onChange={handleChange}
              ></InputMask>
              <Typography style={style.text}>Insira seu telefone</Typography>
              <InputMask
                mask="(99) 99999 - 9999"
                style={{
                  ...style.inputBase,
                  padding: isMobile ? "0 1rem" : "0.5rem",
                  width: isMobile ? "200px" : "100%",
                  height: isMobile ? "40px" : "",
                  textAlign: isMobile ? "center" : "",
                }}
                placeholder="(11) 91234 - 5678"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              ></InputMask>
              <Typography style={style.text}>Insira seu Email:</Typography>
              <InputBase
                style={{
                  ...style.inputBase,
                  padding: isMobile ? "0 0.5rem" : "0.5rem",
                  width: isMobile ? "250px" : "100%",
                  height: isMobile ? "40px" : "35px",
                  textAlign: isMobile ? "center" : "",
                }}
                placeholder="user@exemplo.com..."
                name="email"
                value={formData.email}
                onChange={handleChange}
              ></InputBase>
              <Typography style={style.text}>Insira sua Senha:</Typography>
              <InputBase
                style={{
                  ...style.inputBase,
                  padding: isMobile ? "0 0.5rem" : "0.5rem",
                  width: isMobile ? "250px" : "100%",
                  height: isMobile ? "40px" : "40px",
                  textAlign: isMobile ? "center" : "",
                }}
                type="password"
                placeholder="Senha..."
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              ></InputBase>
              <Typography style={style.text}>Insira seu CPF:</Typography>
              <InputMask
                mask="999.999.999-99"
                style={{
                  ...style.inputBase,
                  padding: isMobile ? "0 0.5rem" : "0.5rem",
                  width: isMobile ? "220px" : "100%",
                  height: isMobile ? "40px" : "",
                  textAlign: isMobile ? "center" : "",
                }}
                placeholder="Ex: 123.456.789-00"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
              ></InputMask>
              <Typography style={{ ...style.text, width: "100%" }}>
                Insira sua data de nascimento:
              </Typography>
              <InputBase
                style={{
                  ...style.inputBase,
                  padding: isMobile ? "0 0.5rem" : "0.5rem",
                  width: isMobile ? "250px" : "100%",
                  height: isMobile ? "40px" : "40px",
                  textAlign: isMobile ? "center" : "",
                }}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
              ></InputBase>
              <Button
                variant="contained"
                type="submit"
                style={{
                  ...style.button,
                  background: "green",
                  padding: isMobile ? "0 0.5rem" : "0.5rem",
                  width: isMobile ? "250px" : "300px",
                  height: isMobile ? "40px" : "",
                  textAlign: isMobile ? "center" : "",
                  marginTop: "2rem",
                }}
                sx={{ marginTop: "15px" }}
              >
                Confirmar
              </Button>
            </Box>
          </form>
          <Typography style={{ ...style.text, width: "100%"}} variant="h6">
            Possui Cadastro?
          </Typography>
          <Box>
            <Link to={"/login"}>
              <Button
                style={style.button}
                sx={{
                  marginBottom: "20px",
                  marginTop: "10px",
                  padding: isMobile ? "0 0.5rem" : "0.5rem",
                  width: isMobile ? "250px" : "300px",
                  height: isMobile ? "40px" : "",
                  textAlign: isMobile ? "center" : "",
                }}
                variant="contained"
              >
                Acesse sua conta
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;
