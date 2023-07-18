import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../img/logo.png";

const Header = () => {
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
        <div className="connexion-buttons">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
