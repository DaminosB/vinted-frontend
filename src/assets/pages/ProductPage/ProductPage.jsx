import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
import Carousel from "../../components/Carousel/Carousel";

const ProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--kc7q9tc45mqv.code.run/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  //   console.log(data);

  //   const { product_image } = data;

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main className="product-page">
      <div className="container">
        <div className="content-box">
          <Carousel images={data.product_image} />
          <div>
            <p className="price">{data.product_price}&nbsp;€</p>
            <table>
              <tbody>
                <tr>
                  <td>MARQUE</td>
                  <td>{data.product_details[1].MARQUE}</td>
                </tr>
                <tr>
                  <td>TAILLE</td>
                  <td>{data.product_details[2].TAILLE}</td>
                </tr>
                <tr>
                  <td>ETAT</td>
                  <td>{data.product_details[0].ETAT}</td>
                </tr>
                <tr>
                  <td>COULEUR</td>
                  <td>{data.product_details[3].COULEUR}</td>
                </tr>
                <tr>
                  <td>EMPLACEMENT</td>
                  <td>{data.product_details[4].EMPLACEMENT}</td>
                </tr>
              </tbody>
            </table>
            <div className="divider"></div>
            <div>
              <h3>{data.product_name}</h3>
              <p>{data.product_description}</p>
            </div>
            <div className="owner">
              <img src={data.owner.account.avatar.secure_url} alt="" />
              <p>{data.owner.account.username}</p>
            </div>
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;