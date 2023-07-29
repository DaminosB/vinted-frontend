import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PublishPage.css";
import axios from "axios";
import ImagesToUploadBox from "../../components/ImagesToUploadBox/ImagesToUploadBox";

const PublishPage = ({ token, setShowSigninModal }) => {
  const [showPublishPage, setShowPublishPage] = useState(true);

  const [pictures, setPictures] = useState([]);
  const [previewPictures, setPreviewPictures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setShowPublishPage(false);
      setShowSigninModal(true);
    } else {
      setShowPublishPage(true);
    }
  }, [token, setShowSigninModal]);

  const handlePublish = async () => {
    try {
      if (
        pictures &&
        title &&
        description &&
        brand &&
        size &&
        color &&
        condition &&
        place &&
        price
      ) {
        setIsLoading(true);
        const formData = new FormData();

        formData.append("product_name", title);
        formData.append("product_description", description);
        formData.append("product_price", price);
        formData.append("condition", condition);
        formData.append("city", place);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);

        pictures.forEach((file) => {
          formData.append("pictures", file);
        });

        const response = await axios.post(
          "https://site--backend-vinted--kc7q9tc45mqv.code.run/offer/publish",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/offer/${response.data._id}`);
        setIsLoading(false);
        errorMessage && setErrorMessage("");
      } else {
        setErrorMessage("Veuillez renseigner ce champ");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    showPublishPage && (
      <main>
        <div className="container">
          <h1>Vends ton article</h1>
          <form className="publish-page">
            <ImagesToUploadBox
              previewPictures={previewPictures}
              setPreviewPictures={setPreviewPictures}
              pictures={pictures}
              setPictures={setPictures}
            />
            {errorMessage && pictures.length === 0 && (
              <p className="error-message">{errorMessage}</p>
            )}
            <div>
              <label htmlFor="title">
                <p>Titre</p>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  placeholder="ex: Chemise Sézanne verte"
                />
              </label>
              {errorMessage && !title && (
                <p className="error-message">{errorMessage}</p>
              )}
              <label htmlFor="description">
                <p>Décris ton article</p>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  placeholder="ex. Porté quelques fois, taille correctement"
                ></textarea>
              </label>
              {errorMessage && !description && (
                <p className="error-message">{errorMessage}</p>
              )}
            </div>
            <div>
              <label htmlFor="brand">
                <p>Marque</p>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                  placeholder="ex. Zara"
                />
              </label>
              {errorMessage && !brand && (
                <p className="error-message">{errorMessage}</p>
              )}
              <label htmlFor="size">
                <p>Taille</p>
                <input
                  type="text"
                  name="size"
                  id="size"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                  placeholder="ex. L / 40 / 12"
                />
              </label>
              {errorMessage && !size && (
                <p className="error-message">{errorMessage}</p>
              )}
              <label htmlFor="color">
                <p>Couleur</p>
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                  placeholder="ex. Fuchsia"
                />
              </label>
              {errorMessage && !color && (
                <p className="error-message">{errorMessage}</p>
              )}
              <label htmlFor="condition">
                <p>Etat</p>
                <input
                  type="text"
                  name="condition"
                  id="condition"
                  value={condition}
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                  placeholder="ex. Neuf avec étiquette"
                />
              </label>
              {errorMessage && !condition && (
                <p className="error-message">{errorMessage}</p>
              )}
              <label htmlFor="place">
                <p>Lieu</p>
                <input
                  type="text"
                  name="place"
                  id="place"
                  value={place}
                  onChange={(event) => {
                    setPlace(event.target.value);
                  }}
                  placeholder="ex. Paris"
                />
              </label>
              {errorMessage && !place && (
                <p className="error-message">{errorMessage}</p>
              )}
            </div>
            <div>
              <label htmlFor="price">
                <p>Prix</p>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </label>
              {errorMessage && price === 0 && (
                <p className="error-message">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              className={isLoading ? "disabled" : ""}
              onClick={(event) => {
                event.preventDefault();
                handlePublish();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Veuillez Patienter" : "Ajouter"}
            </button>
          </form>
        </div>
      </main>
    )
  );
};

export default PublishPage;
