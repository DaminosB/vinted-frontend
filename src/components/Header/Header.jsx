import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";
import logo from "../../assets/img/logo.png";
import SliderComponent from "../SliderComponent/SliderComponent";

const Header = ({
  setShowSignupModal,
  setShowSigninModal,
  searchBar,
  setSearchBar,
  token,
  setToken,
  priceValues,
  setPriceValues,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>
        <form>
          <label htmlFor="search-bar">
            <input
              type="search"
              name="search-bar"
              id="search-bar"
              placeholder="Recherche des articles"
              value={searchBar}
              onChange={(event) => {
                setSearchBar(event.target.value);
              }}
            />
          </label>
          {location.pathname === "/" && (
            <SliderComponent
              priceValues={priceValues}
              setPriceValues={setPriceValues}
            />
          )}
        </form>
        {!token ? (
          <div className="connexion-buttons">
            <button
              onClick={() => {
                setShowSignupModal(true);
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                setShowSigninModal(true);
              }}
            >
              Se connecter
            </button>
          </div>
        ) : (
          <div className="connexion-buttons">
            <button
              onClick={() => {
                setToken("");
                Cookies.remove("token");
                navigate();
              }}
            >
              Se déconnecter
            </button>
            <button
              onClick={() => {
                navigate("/user/orders");
              }}
            >
              Mon activité
            </button>
          </div>
        )}
        <Link to="/offer/publish">
          <button>Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
