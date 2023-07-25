import { useState } from "react";
import Cookies from "js-cookie";
import "./Signin.css";
import axios from "axios";

const Signin = ({ showSigninModal, setShowSigninModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setShowSigninModal(false);
    }
  });

  const handleSubmitSignin = async () => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--kc7q9tc45mqv.code.run/user/login",
        { email, password }
      );
      Cookies.set("token", response.data.token);
      setShowSigninModal(false);
    } catch (error) {
      console.log(error.response);
      setErrorMessage("Email ou mot de passe invalide");
    }
  };

  if (showSigninModal) {
    return (
      <div
        className="modal-wrapper"
        onClick={() => {
          setShowSigninModal(false);
        }}
      >
        <form
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
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
          {errorMessage && <p className="red-text">{errorMessage}</p>}
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              handleSubmitSignin();
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    );
  }
};

export default Signin;
