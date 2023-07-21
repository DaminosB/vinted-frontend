import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";
import logo from "../../img/logo.png";

const Header = ({ setShowSignupModal, setShowSigninModal }) => {
  const navigate = useNavigate();
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
            />
          </label>
        </form>
        {!Cookies.get("token") ? (
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
                Cookies.remove("token");
                navigate();
              }}
            >
              Se déconnecter
            </button>
          </div>
        )}
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
