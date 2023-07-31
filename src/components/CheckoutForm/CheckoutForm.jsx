import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./CheckoutForm.css";

const CheckoutForm = ({ token, title, seller, price, offerID }) => {
  const [confirmMessage, setConfirmMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });

    const stripeToken = stripeResponse.token.id;
    try {
      const response = await axios.post(
        // "https://site--backend-vinted--kc7q9tc45mqv.code.run/payment",
        "http://localhost:3000/payment",
        {
          stripeToken,
          offerID,
          token,
          title,
          seller,
          price,
        }
      );
      console.log("reponse du serveur =>", response.data);
      if (response.data.status === "succeeded") {
        setConfirmMessage("Paiement validé !");
        setTimeout(() => {
          navigate("/user/orders");
        }, 3000);
      } else {
        alert("Le paiement n'a pas abouti");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {confirmMessage ? (
        <p>{confirmMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button>Pay</button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
