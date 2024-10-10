import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Card } from "@mui/material";
import "./Obrigado.css";

function ThanksPage() {
  const [orderItems, setOrderItems] = useState([]);

  // Recupera o pedido do localStorage assim que o componente for montado
  useEffect(() => {
    const savedOrderItems = localStorage.getItem("orderItems");
    if (savedOrderItems) {
      // Verifica se savedOrderItems é um array válido antes de atribuir
      try {
        const parsedItems = JSON.parse(savedOrderItems);
        if (Array.isArray(parsedItems)) {
          setOrderItems(parsedItems);
        } else {
          setOrderItems([]);
        }
      } catch (error) {
        console.error("Erro ao parsear orderItems:", error);
        setOrderItems([]);
      }
    }
  }, []);

  // Função para calcular o total do pedido
  const calcularTotal = () => {
    if (!Array.isArray(orderItems)) return 0; // Garante que orderItems seja um array
    return orderItems.reduce((total, item) => {
      return total + item.quantity * item.price; // Assumindo que cada item tem um preço
    }, 0);
  };

  return (
    <div className="div">
      <h4 className="typography1">Obrigado por realizar sua compra com o</h4>
      <h4 className="typography1">SUPERMERCADO NOSSO LAR!</h4>

      <Card className="Card">
        <h3 className="detalhes_do_pedido">Detalhes do seu pedido:</h3>

        {/* Lista de itens do pedido */}
        {orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <Typography key={index} className="typography2" variant="h6">
              {item.name} - {item.quantity}x R${" "}
              {(item.price * item.quantity).toFixed(2)}
            </Typography>
          ))
        ) : (
          <Typography className="typography2" variant="h6">
            Nenhum item no pedido.
          </Typography>
        )}

        {/* Exibir o total do pedido */}
        <Typography className="typography2" variant="h6">
          Total: R${calcularTotal().toFixed(2)}
        </Typography>
        <Typography className="typography2" variant="h6">
          Opção de entrega: Retirar na loja
        </Typography>
      </Card>
    </div>
  );
}

export default ThanksPage;
