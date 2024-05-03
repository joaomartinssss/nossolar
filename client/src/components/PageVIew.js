import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const PageViewProducts = ({}) => {
  return (
    <div>
      <Card key={index} style={{ marginBottom: "10px" }}>
        <CardContent>
          <Typography variant="h5" component={"div"}>
            Pedido #{index + 1}{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Produto: {pedido.product} <br />
            Quantidade: {pedido.quantity} <br />
            Preço: {pedido.price}
          </Typography>
          <Button variant="contained" color="blue">
            Detalhes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageViewProducts;