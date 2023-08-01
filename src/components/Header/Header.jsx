import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";
import logo from "../../assets/img/logo.png";

const Header = ({
  setShowSignupModal,
  setShowSigninModal,
  searchBar,
  setSearchBar,
  priceFilter,
  setPriceFilter,
  searchPriceMin,
  setSearchPriceMin,
  searchPriceMax,
  setSearchPriceMax,
  token,
  setToken,
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
          {/* {location.pathname === "/" && (
            <div className="filters">
              <label htmlFor="price-filter">
                <span>Trier par prix&nbsp;:</span>
                <input
                  type="button"
                  value={priceFilter ? "On" : "Off"}
                  onClick={() => {
                    setPriceFilter(!priceFilter);
                  }}
                  className={priceFilter ? "active" : "inactive"}
                />
              </label>
              <span>Prix entre&nbsp;:</span>
              <label htmlFor="price-min">
                <input
                  type="number"
                  name="price-min"
                  id="price-min"
                  value={searchPriceMin}
                  min="0"
                  onChange={(event) => {
                    event.target.value
                      ? setSearchPriceMin(parseInt(event.target.value))
                      : setSearchPriceMin(parseInt(0));
                  }}
                />
              </label>
              <label htmlFor="price-max">
                <input
                  type="number"
                  name="price-max"
                  id="price-max"
                  value={searchPriceMax}
                  min={searchPriceMin + 1}
                  onChange={(event) => {
                    setSearchPriceMax(parseInt(event.target.value));
                  }}
                />
              </label>
            </div>
          )} */}
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
