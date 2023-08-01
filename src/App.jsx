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
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import Loading from "./components/Loading/Loading";

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [canDisable, setCanDisable] = useState(true);

  const [showLoading, setShowLoading] = useState(false);

  const [token, setToken] = useState(Cookies.get("token"));

  const [searchBar, setSearchBar] = useState("");
  const [priceFilter, setPriceFilter] = useState(true);
  const [searchPriceMin, setSearchPriceMin] = useState(0);
  const [searchPriceMax, setSearchPriceMax] = useState(100);

  useEffect(() => {
    token && Cookies.set("token", token);
  }, [token]);

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
              setShowLoading={setShowLoading}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={<ProductPage setShowLoading={setShowLoading} />}
        />
        <Route
          path="/offer/publish"
          element={
            <PublishPage
              token={token}
              setShowSigninModal={setShowSigninModal}
              setCanDisable={setCanDisable}
            />
          }
        />
        <Route
          path="/payment/:id"
          element={
            <PaymentPage
              token={token}
              setShowSigninModal={setShowSigninModal}
              setCanDisable={setCanDisable}
              setShowLoading={setShowLoading}
            />
          }
        />
        <Route
          path="/user/orders"
          element={
            <ActivityPage
              token={token}
              setShowSigninModal={setShowSigninModal}
              setCanDisable={setCanDisable}
              setShowLoading={setShowLoading}
            />
          }
        />
      </Routes>
      <Signup
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
        token={token}
        setToken={setToken}
        setShowSigninModal={setShowSigninModal}
        canDisable={canDisable}
        setCanDisable={setCanDisable}
      />
      <Signin
        showSigninModal={showSigninModal}
        setShowSigninModal={setShowSigninModal}
        token={token}
        setToken={setToken}
        setShowSignupModal={setShowSignupModal}
        canDisable={canDisable}
        setCanDisable={setCanDisable}
      />
      <Loading showLoading={showLoading} />
    </Router>
  );
}

export default App;
