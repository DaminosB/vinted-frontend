import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./assets/components/Header/Header";
import HomePage from "./assets/pages/HomePage/HomePage";
import ProductPage from "./assets/pages/ProductPage/ProductPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
