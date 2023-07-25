import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./App.css";
import Header from "./assets/components/Header/Header";
import HomePage from "./assets/pages/HomePage/HomePage";
import ProductPage from "./assets/pages/ProductPage/ProductPage";
import Signup from "./assets/components/Sign-up/Signup";
import Signin from "./assets/components/Signin/Signin";

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

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
            />
          }
        />
        <Route path="/offer/:id" element={<ProductPage />} />
      </Routes>
      <Signup
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
        token={token}
        setToken={setToken}
      />
      <Signin
        showSigninModal={showSigninModal}
        setShowSigninModal={setShowSigninModal}
        token={token}
        setToken={setToken}
      />
    </Router>
  );
}

export default App;
