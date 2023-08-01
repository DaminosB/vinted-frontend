import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentPage.css";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const stripePromise = loadStripe(
  "pk_test_51NZDpeLxQ617V9n8A5Td5QLWaEQxPrCaP3Zr28XuCB268SkdV813a8PEXhT73rDKbummxdgcCazhMQ2raLYnsBt000NdgirPpi"
);

const PaymentPage = ({
  token,
  setShowSigninModal,
  setCanDisable,
  setShowLoading,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const buyerProtectionFees = 0.4;
  const shippingFees = 0.8;
  const totalCost = (
    data.product_price +
    buyerProtectionFees +
    shippingFees
  ).toFixed(2);

  const { id } = useParams("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const response = await axios.get(
          `https://site--backend-vinted--kc7q9tc45mqv.code.run/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        setShowLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();

    if (!token) {
      setCanDisable(false);
      setShowSigninModal(true);
    }
  }, [token, setShowSigninModal]);

  return isLoading ? (
    <></>
  ) : (
    token && (
      <div className="container">
        <h1>Rappel de votre achat</h1>
        <table>
          <tbody>
            <tr>
              <td>Visuel</td>
              <td>Nom de l'article</td>
              <td>Description</td>
              <td>Vendeur</td>
              <td>Prix</td>
            </tr>
            <tr>
              <td>
                <img src={data.product_image[0].secure_url} alt="" />
              </td>
              <td>{data.product_name}</td>
              <td>{data.product_description}</td>
              <td>{data.owner.account.username}</td>
              <td>{data.product_price.toFixed(2)}&nbsp;€</td>
            </tr>
          </tbody>
        </table>
        <div className="order-recap">
          <div>
            <div>
              <span>Frais de protection acheteurs</span>
              <span>{buyerProtectionFees.toFixed(2)}&nbsp;€</span>
            </div>
            <div>
              <span>Frais de port</span>
              <span>{shippingFees.toFixed(2)}&nbsp;€</span>
            </div>
            <div className="strong">
              <span>Total</span>
              <span>{totalCost}&nbsp;€</span>
            </div>
          </div>
        </div>
        <div className="payment-section">
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="strong">{data.product_name}</span>. Vous allez
            payer <span className="strong">{totalCost}&nbsp;€</span> (frais de
            protection et frais de port inclus).
          </p>
          {!data.buyer ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                token={token}
                title={data.product_name}
                seller={data.owner.account.username}
                price={totalCost}
                offerID={data._id}
              />
            </Elements>
          ) : (
            <p>
              <Link to="/">
                Trop tard&nbsp;! Cet article n'est plus à vendre. Suivez ce lien
                pour revenir à l'accueil
              </Link>
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default PaymentPage;
