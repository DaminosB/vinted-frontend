import { useState, useEffect } from "react";
import "./ActivityPage.css";
import Orders from "../../components/Orders/Orders";
import Offers from "../../components/Offers/Offers";

const OrdersPage = ({ token, setShowSigninModal, setCanDisable }) => {
  const [showOrdersComp, setShowOrdersComp] = useState(true);
  const [showOffersComp, setShowOffersComp] = useState(false);

  useEffect(() => {
    if (!token) {
      setCanDisable(false);
      setShowSigninModal(true);
    }
  }, [token, setShowSigninModal]);

  return (
    token && (
      <main className="container">
        <h1>
          <span
            className={!showOrdersComp ? "inactive" : ""}
            onClick={() => {
              setShowOrdersComp(true);
              setShowOffersComp(false);
            }}
          >
            Mes achats
          </span>
          <span
            className={!showOffersComp ? "inactive" : ""}
            onClick={() => {
              setShowOffersComp(true);
              setShowOrdersComp(false);
            }}
          >
            Mes annonces
          </span>
        </h1>
        {showOrdersComp && <Orders token={token} />}
        {showOffersComp && <Offers token={token} />}
      </main>
    )
  );
};

export default OrdersPage;
