import React from "react";
import { IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMediaQuery } from "@mui/material";
import breakPoints from "../BreakPoints";

const style = {
  card: {
    // marginBottom: "10rem",
    // display: "flex",
    // flexDirection: "column",
    // height: "auto",
    width: "100%",
    height: "100dvh",
    overflowY: "auto",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
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
    background: "#E5E7E6",
    border: "1px solid #A3A9AA",
    borderRadius: "3px",
    padding: "10px",
  },
  link: {
    textDecoration: "none",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  },
  buttonFlexContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  typographyClasses: {
    fontFamily: "unset",
    padding: "0rem 0rem 1.5rem 0rem",
    background: "white",
    borderRadius: "3px",
    padding: "5px",
    marginBottom: "1.5px",
    border: "1px solid #A3A9AA",
  },
  clientDados: {
    marginLeft: "1rem",
    fontWeight: "bold",
    fontFamily: "unset",
    background: "white",
    borderRadius: "3px",
    padding: "5px",
    marginRight: "1rem",
    marginBottom: "1px",
    border: "1px solid #A3A9AA",
  },
};

function ProductRow({ item, handleIncrement, handleDecrement, handleRemove }) {
  const isMobile = useMediaQuery(breakPoints.mobile);

  return (
    <Grid container alignItems="center" style={style.grid} sx={{}}>
      <Grid item xs={2}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            borderRadius: "50%",
            maxWidth: "60px",
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography
          sx={{ fontWeight: "bold", marginLeft: isMobile ? "1rem" : "" }}
        >
          {item.name}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
          marginLeft: isMobile ? "1rem" : "",
        }}
      >
        <IconButton
          sx={{ margin: "5px 0" }}
          onClick={() => handleDecrement(item.id)}
        >
          <RemoveIcon sx={{ color: "red" }} />
        </IconButton>
        <Typography sx={{ margin: "0 5px", fontWeight: "bold" }}>
          {item.quantity}
        </Typography>
        <IconButton onClick={() => handleIncrement(item.id)}>
          <AddIcon sx={{ color: "#14248A" }} />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => handleRemove(item.id)}>
          <DeleteForeverOutlinedIcon
            sx={{ color: "red", marginLeft: "3rem" }}
          />
        </IconButton>
      </Grid>
      <Grid item xs={6} sx={{ marginLeft: isMobile ? "2rem" : "" }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {" "}
          Total: R$ {(item.price * item.quantity).toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ProductRow;
