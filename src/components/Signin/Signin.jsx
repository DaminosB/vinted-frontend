import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Signin.css";
import axios from "axios";

const Signin = ({
  showSigninModal,
  setShowSigninModal,
  token,
  setToken,
  setShowSignupModal,
  canDisable,
  setCanDisable,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname !== "/payment/*" &&
      location.pathname !== "/offer/publish" &&
      location.pathname !== "/user/orders"
    ) {
      setCanDisable(true);
    }
  }, [location, showSigninModal]);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && canDisable) {
      setShowSigninModal(false);
    }
  });

  const handleSubmitSignin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://site--backend-vinted--kc7q9tc45mqv.code.run/user/login",
        { email, password }
      );
      setToken(response.data.token);
      setShowSigninModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setErrorMessage("Email ou mot de passe invalide");
      setIsLoading(false);
    }
  };

  if (showSigninModal) {
    return (
      <div
        className="modal-wrapper"
        onClick={() => {
          canDisable && setShowSigninModal(false);
        }}
      >
        <form
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {canDisable && (
            <button
              type="button"
              className="close-button"
              onClick={() => {
                setErrorMessage("");
                setShowSigninModal(false);
              }}
            >
              x
            </button>
          )}
          <h1>Se connecter</h1>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Adresse email"
              value={email}
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
              }}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => {
                const value = event.target.value;
                setPassword(value);
              }}
            />
          </label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p
            className="text-action"
            onClick={() => {
              setShowSignupModal(true);
              setShowSigninModal(false);
            }}
          >
            Vous n'avez pas encore de compte&nbsp;? Rdv sur la page inscription.
          </p>
          {!canDisable && (
            <p
              className="text-action"
              onClick={() => {
                setShowSigninModal(false);
                navigate("/");
              }}
            >
              Pour revenir à l'accueil, c'est par ici&nbsp;!
            </p>
          )}
          <button
            type="submit"
            className={isLoading ? "disabled" : ""}
            onClick={(event) => {
              event.preventDefault();
              handleSubmitSignin();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Veuillez patienter" : "Se connecter"}
          </button>
        </form>
      </div>
    );
  }
};

export default Signin;
