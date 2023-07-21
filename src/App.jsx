import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./assets/components/Header/Header";
import HomePage from "./assets/pages/HomePage/HomePage";
import ProductPage from "./assets/pages/ProductPage/ProductPage";
import Signup from "./assets/components/Sign-up/Signup";
import Signin from "./assets/components/Signin/Signin";

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  return (
    <Router>
      <Header
        setShowSignupModal={setShowSignupModal}
        setShowSigninModal={setShowSigninModal}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer/:id" element={<ProductPage />} />
      </Routes>
      <Signup
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
      />
      <Signin
        showSigninModal={showSigninModal}
        setShowSigninModal={setShowSigninModal}
      />
    </Router>
  );
}

export default App;
