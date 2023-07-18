import { useState } from "react";
import "./Carousel.css";

const Carousel = ({ images }) => {
  const [pictureToDisplay, setPictureToDisplay] = useState(
    images[0].secure_url
  );

  //   console.log(images);
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
