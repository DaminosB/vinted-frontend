import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

const Signup = ({
  showSignupModal,
  setShowSignupModal,
  token,
  setToken,
  setShowSigninModal,
  canDisable,
  setCanDisable,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({});
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [newsletter, setNewsletter] = useState(false);
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
  }, [location, showSignupModal]);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && canDisable) {
      setShowSignupModal(false);
    }
  });

  const handleSubmitSignup = async () => {
    if (!username || !email || !password) {
      setErrorMessage("Veuillez renseigner ce champ");
    } else {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar);
        formData.append("newsletter", newsletter);
        const response = await axios.post(
          "http://localhost:3000/user/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        //   console.log(response.data.token);
        setToken(response.data.token);
        setUsername("");
        setEmail("");
        setPassword("");
        setNewsletter(false);
        setShowSignupModal(false);
        setPreviewAvatar(null);
        setIsLoading(false);
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
          canDisable && setShowSignupModal(false);
        }}
      >
        <form
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h1>S'inscrire</h1>
          {canDisable && (
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
          )}
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
            <p className="error-message">{errorMessage}</p>
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
          {errorMessage && !email && (
            <p className="error-message">{errorMessage}</p>
          )}
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
            <p className="error-message">{errorMessage}</p>
          )}
          <label htmlFor="avatar">
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(event) => {
                setAvatar(event.target.files[0]);
                setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
              }}
            />
            <div className="avatar">
              <span>Votre avatar</span>
              {previewAvatar ? (
                <img src={previewAvatar} alt="Votre avatar" />
              ) : (
                <div className="default-avatar">+</div>
              )}
            </div>
          </label>
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
          <p
            className="text-action"
            onClick={() => {
              setShowSignupModal(false);
              setShowSigninModal(true);
            }}
          >
            Vous avez déjà un compte&nbsp;? Rdv sur la page connexion.
          </p>
          {!canDisable && (
            <p
              className="text-action"
              onClick={() => {
                setShowSignupModal(false);
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
              handleSubmitSignup();
            }}
            disabled={isLoading}
          >
            S'inscrire
          </button>
        </form>
      </div>
    );
  }
};

export default Signup;
