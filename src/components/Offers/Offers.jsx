import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Offers.css";
import Loading from "../Loading/Loading";

const Offers = ({ token }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://site--backend-vinted--kc7q9tc45mqv.code.run/user/offers?token=${token}`
        );
        setOffers(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoading ? (
    <Loading />
  ) : offers.length === 0 ? (
    <p>
      <Link to="/offer/publish">
        Vous n'avez pas encore posté d'annonce. Rdv sur cette page pour poster
        votre première annonce
      </Link>
    </p>
  ) : (
    <table>
      <tbody>
        <tr>
          <td>Photo</td>
          <td>Article</td>
          <td>Prix</td>
          <td>Statut</td>
        </tr>
        {offers.map((offer) => {
          return (
            <tr
              className={!offer.buyer ? "clickable" : ""}
              key={offer._id}
              onClick={() => {
                !offer.buyer && navigate(`/offer/${offer._id}`);
              }}
            >
              <td>
                <img src={offer.product_image[0].secure_url} alt="" />
              </td>
              <td>{offer.product_name}</td>
              <td>{offer.product_price.toFixed(2)} €</td>
              <td>{offer.buyer ? "Vendu" : "Disponible"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Offers;
