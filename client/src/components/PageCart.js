import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@material-ui/icons/RemoveIcon";
import AddIcon from "@material-ui/icons/AddIcon";
import DeleteIcon from "@material-ui/icons/DeleteIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/icons-material/IconButton";

const PageCart = ({}) => {
  <div>
    <Card>
      <Typography>Supermercado Nosso Lar</Typography>
      <Button onClick={{}}>
        <ArrowBackIcon /> Continuar Comprando
      </Button>
      <Typography>Meu Carrinho</Typography>
      <CardContent>
        <Grid>
          <Grid>
            <div>
              <img src={Product.image} alt={product.name}></img>
            </div>
          </Grid>
          <Grid>
            <Typography>{product.name}</Typography>
          </Grid>
          <Grid>
            <Typography>{product.price}</Typography>
          </Grid>
          <Grid>
            {/* o codigo abaixo eu peguei de exemplo do arquivo "Cart.js" */}
            <IconButton
              aria-label="Diminuir quantidade"
              onClick={() => handleDecrement(item.id)}
            >
              <RemoveIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ color: "black" }}>
              {item.quantity}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Incrementar quantidade"
              onClick={() => handleIncrement(item.id)}
            >
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" style={{ color: "black" }}>
              R$ {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              aria-label="Remover item"
              onClick={() => handleRemove(`${item.id}-${item.quantity}`)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Button>
            <DeleteIcon />
            Esvaziar Carrinho
          </Button>
        </Grid>
      </CardContent>
      <CardContent>
        <Typography>Total da Compra</Typography>
        <Typography>Subtotal</Typography>
        <Typography>Frete</Typography>
        <Typography>Total</Typography>
        <Button>Continuar para Pagamento</Button>
      </CardContent>
    </Card>
  </div>;
};

export default PageCart;
