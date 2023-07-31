import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Signup from "./components/Sign-up/Signup";
import Signin from "./components/Signin/Signin";
import PublishPage from "./pages/PublishPage/PublishPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  const [token, setToken] = useState(Cookies.get("token"));

  const [searchBar, setSearchBar] = useState("");
  const [priceFilter, setPriceFilter] = useState(true);
  const [searchPriceMin, setSearchPriceMin] = useState(0);
  const [searchPriceMax, setSearchPriceMax] = useState(100);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    token && Cookies.set("token", token);
  }, [token]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `https://site--backend-vinted--kc7q9tc45mqv.code.run/offer/${id}`
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Router>
      <Header
        setShowSignupModal={setShowSignupModal}
        setShowSigninModal={setShowSigninModal}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        searchPriceMin={searchPriceMin}
        setSearchPriceMin={setSearchPriceMin}
        searchPriceMax={searchPriceMax}
        setSearchPriceMax={setSearchPriceMax}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchBar={searchBar}
              setSearchBar={setSearchBar}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              searchPriceMin={searchPriceMin}
              setSearchPriceMin={setSearchPriceMin}
              searchPriceMax={searchPriceMax}
              setSearchPriceMax={setSearchPriceMax}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={
            <ProductPage
              fetchData={fetchData}
              isLoading={isLoading}
              data={data}
            />
          }
        />
        <Route
          path="/offer/publish"
          element={
            <PublishPage
              token={token}
              setShowSigninModal={setShowSigninModal}
            />
          }
        />
        <Route
          path="/payment/:id"
          element={
            <PaymentPage
              token={token}
              fetchData={fetchData}
              isLoading={isLoading}
              data={data}
            />
          }
        ></Route>
      </Routes>
      <Signup
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
        token={token}
        setToken={setToken}
        setShowSigninModal={setShowSigninModal}
      />
      <Signin
        showSigninModal={showSigninModal}
        setShowSigninModal={setShowSigninModal}
        token={token}
        setToken={setToken}
        setShowSignupModal={setShowSignupModal}
      />
    </Router>
  );
}

export default App;
