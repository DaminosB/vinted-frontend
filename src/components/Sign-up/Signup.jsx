import { useState } from "react";
import "./Signup.css";
import axios from "axios";

const Signup = ({ showSignupModal, setShowSignupModal, token, setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setShowSignupModal(false);
    }
  });

  const handleSubmitSignup = async () => {
    if (!username || !email || !password) {
      setErrorMessage("Veuillez renseigner ce champ");
    } else {
      try {
        const response = await axios.post(
          "https://site--backend-vinted--kc7q9tc45mqv.code.run/user/signup",
          { username, email, password, newsletter }
        );
        //   console.log(response.data.token);
        setToken(response.data.token);
        setUsername("");
        setEmail("");
        setPassword("");
        setNewsletter(false);
        setShowSignupModal(false);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  // console.log(newsletter);
  if (showSignupModal) {
    return (
      <div
        className="modal-wrapper"
        onClick={() => {
          setShowSignupModal(false);
        }}
      >
        <form
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h1>S'inscrire</h1>
          <button
            type="button"
            className="close-button"
            onClick={() => {
              setErrorMessage("");
              setShowSignupModal(false);
            }}
          >
            x
          </button>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(event) => {
                const value = event.target.value;
                setUsername(value);
              }}
            />
          </label>
          {errorMessage && !username && (
            <p className="red-text">{errorMessage}</p>
          )}
          <label htmlFor="mail">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
              }}
            />
          </label>
          {errorMessage && !email && <p className="red-text">{errorMessage}</p>}
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
          {errorMessage && !password && (
            <p className="red-text">{errorMessage}</p>
          )}
          <label htmlFor="newsletter">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              checked={newsletter}
              onChange={(event) => {
                const checked = event.target.checked;
                setNewsletter(checked);
              }}
            />
            <span>S'inscrire à la newsletter</span>
          </label>
          <p className="legal-notice">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              handleSubmitSignup();
            }}
          >
            S'inscrire
          </button>
        </form>
      </div>
    );
  }
};

export default Signup;
