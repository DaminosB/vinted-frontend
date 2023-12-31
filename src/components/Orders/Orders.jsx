import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
import Loading from "../Loading/Loading";

const Orders = ({ token, setShowLoading }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setShowLoading(true);
        const response = await axios.get(
          `https://site--backend-vinted--kc7q9tc45mqv.code.run/user/orders?token=${token}`
        );
        setOrders(response.data);
        setIsLoading(false);
        setShowLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoading ? (
    <></>
  ) : orders.length === 0 ? (
    <p>
      <Link to="/">
        Vous n'avez pas encore effectué d'achat sur Vinted.fr. Trouvez vite
        votre bonheur en suivant ce lien.
      </Link>
    </p>
  ) : (
    <table>
      <tbody>
        <tr>
          <td>Photo</td>
          <td>Article</td>
          <td>Vendeur</td>
          <td>Date</td>
          <td>Prix</td>
        </tr>
        {orders.map((order) => {
          const dateToDisplay = new Date(order.buyer.date);
          return (
            <tr key={order.buyer.date}>
              <td>
                <img src={order.product_image[0].secure_url} alt="" />
              </td>
              <td>{order.product_name}</td>
              <td>{order.owner.account.username}</td>
              <td>{dateToDisplay.toLocaleDateString("fr")}</td>
              <td>{order.buyer.orderPrice.toFixed(2)} €</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Orders;
