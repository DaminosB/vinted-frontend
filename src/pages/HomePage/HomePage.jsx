import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import heroImg from "../../assets/img/hero.jpeg";
import tearingEffect from "../../assets/img/tear.svg";
import Loading from "../../components/Loading/Loading";

const HomePage = ({ searchBar, setShowLoading, priceValues }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [resultPages, setResultPages] = useState([]);
  const [pageToDisplay, setPageToDisplay] = useState(1);

  const priceMin = priceValues[0];
  const priceMax = priceValues[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const response = await axios.get(
          `https://site--backend-vinted--kc7q9tc45mqv.code.run/offers?title=${searchBar}&priceMin=${priceMin}&priceMax=${priceMax}&page=${pageToDisplay}`
        );
        // console.log(response.data);
        setData(response.data);

        const arrayOfPages = [];
        const numberOfPages = Math.floor(response.data.count / 10) + 1;
        for (let i = 1; i <= numberOfPages; i++) {
          arrayOfPages.push(i);
        }
        setResultPages(arrayOfPages);
        setIsLoading(false);
        setShowLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchBar, priceMax, priceMin, pageToDisplay]);

  return isLoading ? (
    <Loading />
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
        <div className="pages-array">
          {resultPages.map((page, index) => {
            return (
              <nav
                key={index}
                onClick={() => {
                  setPageToDisplay(page);
                }}
                className={page === pageToDisplay ? "active-page" : ""}
              >
                {page}
              </nav>
            );
          })}
        </div>
        <div className="results-box">
          {data.offers.map((product, index) => {
            return <Thumbnail key={product._id} product={product} />;
          })}
        </div>
        <div className="pages-array">
          {resultPages.map((page, index) => {
            return (
              <nav
                key={index}
                onClick={() => {
                  setPageToDisplay(page);
                }}
                className={page === pageToDisplay ? "active-page" : ""}
              >
                {page}
              </nav>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
