import { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import heroImg from "../../img/hero.jpeg";
import tearingEffect from "../../img/tear.svg";

const HomePage = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-vinted--kc7q9tc45mqv.code.run/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  //   console.log(data);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main className="home-page">
      <div className="hero">
        <img src={heroImg} alt="" />
        <div className="container">
          <div>
            <h2>Prêts à faire du tri dans vos placards ?</h2>
            <button>Commencer à vendre</button>
          </div>
        </div>
        <div className="tearing-effect">
          <img src={tearingEffect} alt="" />
        </div>
        <img src="" alt="" />
      </div>
      <div className="container">
        <div className="results-box">
          {data.offers.map((product, index) => {
            return <Thumbnail key={product._id} product={product} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
