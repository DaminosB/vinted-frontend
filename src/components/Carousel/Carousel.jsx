import { useState } from "react";
import "./Carousel.css";
import { useEffect } from "react";

const Carousel = ({ images }) => {
  const [pictureToDisplay, setPictureToDisplay] = useState("");

  useEffect(() => {
    setPictureToDisplay(images[0].secure_url);
  }, []);

  return (
    <div className="carousel">
      <div className="picture">
        <img src={pictureToDisplay} alt="Photo du produit" />
      </div>
      <div className="miniatures">
        {images.map((image) => {
          //   console.log(image);
          return (
            <img
              src={image.secure_url}
              key={image._id}
              onClick={() => {
                setPictureToDisplay(image.secure_url);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
