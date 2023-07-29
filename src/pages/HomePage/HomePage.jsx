import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import heroImg from "../../assets/img/hero.jpeg";
import tearingEffect from "../../assets/img/tear.svg";

const HomePage = ({
  searchBar,
  setSearchBar,
  priceFilter,
  setPriceFilter,
  searchPriceMin,
  setSearchPriceMin,
  searchPriceMax,
  setSearchPriceMax,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // let querySearchBar = "";
  // let queryPriceMin = "";
  // let queryPriceMax = "";

  // if (searchBar) {
  //   querySearchBar = `title=${searchBar}`;
  // }

  // if (searchPriceMin) {
  //   queryPriceMin = `priceMin=${searchPriceMin}`;
  // }

  // if (searchPriceMax) {
  //   queryPriceMax = `priceMax=${searchPriceMax}`;
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--kc7q9tc45mqv.code.run/offers?title=${searchBar}&priceMin=${searchPriceMin}&priceMax=${searchPriceMax}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchBar, searchPriceMax, searchPriceMin]);

  // console.log(data);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main className="home-page">
      <div className="hero">
        <img src={heroImg} alt="" />
        <div className="container">
          <div>
            <h2>Prêts à faire du tri dans vos placards ?</h2>
            <Link to="/offer/publish">
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
        <div className="tearing-effect">
          <img src={tearingEffect} alt="" />
        </div>
        <img src="" alt="" />
      </div>
      <div className="container">
        <div className="results-box">
          {priceFilter
            ? data.offers
                .sort((a, b) => {
                  return a.product_price - b.product_price;
                })
                .map((product, index) => {
                  return <Thumbnail key={product._id} product={product} />;
                })
            : data.offers
                .sort((a, b) => {
                  return a.product_name.localeCompare(b.product_name);
                })
                .map((product, index) => {
                  return <Thumbnail key={product._id} product={product} />;
                })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
