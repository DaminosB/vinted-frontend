import { Link } from "react-router-dom";
import "./Thumbnail.css";

const Thumbnail = (props) => {
  //   console.log(props.product);
  const { product_name, product_image, product_price, product_details, _id } =
    props.product;

  let avatar = "";

  if (props.product.owner.avatar) {
    avatar = props.product.owner.avatar.secure_url;
  } else {
    avatar =
      "https://res.cloudinary.com/dwdykfhtf/image/upload/v1684566311/vinted/default_pictures/default-avatar.jpg        ";
  }

  const [etat, marque, taille, couleur, emplacement] = product_details;
  //   console.log(marque, taille);
  return (
    <div className="thumbnail">
      <Link to={`/offer/${_id}`}>
        {/* <h3>{product_name}</h3>
        <img src={product_image[0].secure_url} alt="" />
        <p>{product_price.toFixed(2)}&nbsp;€</p>
        <p>{taille.TAILLE}</p>
        <p>{marque.MARQUE}</p> */}
        <div className="owner">
          <img
            src={props.product.owner.account.avatar.secure_url}
            alt="avatar"
          />
          <p>{props.product.owner.account.username}</p>
        </div>
        <img src={product_image[0].secure_url} alt="" />
        <p className="price">{product_price.toFixed(2)}&nbsp;€</p>
        <p>{taille.TAILLE}</p>
        <p>{marque.MARQUE}</p>
      </Link>
    </div>
  );
};

export default Thumbnail;
