import { useState, useEffect } from "react";
import "./ImagesToUploadBox.css";

const ImagesToUploadBox = ({
  previewPictures,
  setPreviewPictures,
  pictures,
  setPictures,
}) => {
  const [imagesErrorMessage, setImagesErrorMessage] = useState("");

  useEffect(() => {
    if (pictures.length > 20) {
      const imagesToUpload = pictures.slice(0, 20);
      const imagesToDisplay = previewPictures.slice(0, 20);
      setPictures(imagesToUpload);
      setPreviewPictures(imagesToDisplay);
      setImagesErrorMessage("Vous ne pouvez pas envoyer plus de 20 photos.");
    } else if (pictures.length < 20) {
      imagesErrorMessage && setImagesErrorMessage("");
    }
  }, [pictures]);

  const handleRemovePicture = (index) => {
    console.log(index);

    const imagesToUpload = [...pictures];
    imagesToUpload.splice(index, 1);

    const imagesToDisplay = [...previewPictures];
    imagesToDisplay.splice(index, 1);

    // console.log("imagesToDisplay", imagesToDisplay);
    // console.log("imagesToUpload", imagesToUpload);

    setPictures(imagesToUpload);
    setPreviewPictures(imagesToDisplay);
  };

  const handleUploadImages = (event) => {
    const imagesToUpload = [...pictures, ...Array.from(event.target.files)];
    setPictures(imagesToUpload);

    const imagesToDisplay = [...previewPictures];
    for (let i = 0; i < event.target.files.length; i++) {
      imagesToDisplay.push(URL.createObjectURL(event.target.files[i]));
    }
    setPreviewPictures(imagesToDisplay);
  };

  return (
    <div className="uploaded-images">
      {previewPictures.length > 0 &&
        previewPictures.map((image, index) => {
          return (
            <div className="upload-thumbnail" key={index}>
              <img src={image} alt="" />
              <button
                type="button"
                onClick={() => {
                  handleRemovePicture(index);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      <label htmlFor="images" className={pictures.length > 0 ? "full-box" : ""}>
        <input
          type="file"
          name="images"
          id="images"
          multiple
          accept="image/*"
          onChange={handleUploadImages}
          disabled={pictures.length === 20}
        />
        {previewPictures.length > 0 ? (
          previewPictures.length < 20 && (
            <div className="inline-button">
              <div>+</div>
            </div>
          )
        ) : (
          <div className="overlap-button">
            <div>Ajouter des photos</div>
          </div>
        )}
      </label>
      {imagesErrorMessage && (
        <p className="error-message">{imagesErrorMessage}</p>
      )}
    </div>
  );
};

export default ImagesToUploadBox;
