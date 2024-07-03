import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Button, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const StyledUsersContainer = styled("div")({
  position: "absolute",
  top: "410%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "2rem 3rem",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});

const StyledButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "1rem",
});
const StyledTypography = styled(Typography)({
  whiteSpace: "nowrap",
  color: "black",
});

const Users = ({}) => {
  return (
    <StyledUsersContainer
      sx={{
        marginTop: "4rem",
        background: "#E1E5F2",
        border: "1px solid #003599",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#003599",
          width: 45,
          height: 45,
          margin: "0 auto 1rem",
        }}
      >
        <PersonIcon sx={{ fontSize: 35 }} />
      </Avatar>
      <StyledTypography
        variant="h6"
        style={{ color: "black", fontWeight: "bold" }}
      >
        SEJA BEM VINDO!
      </StyledTypography>
      <StyledButtonContainer>
        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            style={{
              marginBottom: "0.5rem",
              minWidth: "150px",
              background: "#003599",
            }}
          >
            Entre
          </Button>
        </Link>
        <Link to="/cadastro">
          <Button
            variant="contained"
            color="primary"
            style={{
              marginBottom: "0.5rem",
              minWidth: "150px",
              background: "#003599",
            }}
          >
            Cadastre-se
          </Button>
        </Link>
      </StyledButtonContainer>
    </StyledUsersContainer>
  );
};

export default Users;
