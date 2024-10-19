import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import "./Obrigado.css";
import axios from "axios";

function ThanksPage() {
  const [orderItems, setOrderItems] = useState([]);
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Recupera os dados do usuário do localStorage ao inicializar
  });

  useEffect(() => {
    if (userData && userData.id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/auth/user/${userData.id}`
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário", error);
        }
      };
      fetchData();
    }
  }, [userData]);

  // Recupera o pedido e os dados do usuário do localStorage assim que o componente for montado
  useEffect(() => {
    // Recupera os itens do pedido
    const savedOrderItems = localStorage.getItem("orderItems");
    if (savedOrderItems) {
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
      <h4 className="typography1">
        Obrigado {userData ? userData.name : "nome não disponível"} por
        <h4 className="typography1">
          realizar sua compra com o SUPERMERCADO NOSSO LAR!
        </h4>
      </h4>
      <h4 className="typography1">Assim que seu pedido estiver pronto,</h4>
      <h4 className="typography1">
        entraremos em contato com o número: {userData.telefone}
      </h4>
      <Card className="Card">
        <h3 className="detalhes_do_pedido">Detalhes do seu pedido:</h3>

        {/* Lista de itens do pedido */}
        {orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <Typography key={index} className="typography2" variant="h6">
              - {item.name} - {item.quantity}x R${" "}
              {(item.price * item.quantity).toFixed(2)}
            </Typography>
          ))
        ) : (
          <Typography className="typography2" variant="h6">
            Nenhum item no pedido.
          </Typography>
        )}

        {/* Exibir o total do pedido */}
        <Typography className="typography3" variant="h6">
          Total: R${calcularTotal().toFixed(2)}
        </Typography>
        <Typography className="typography3" variant="h6">
          Opção de entrega: Retirar na loja
        </Typography>
      </Card>
    </div>
  );
}

export default ThanksPage;
