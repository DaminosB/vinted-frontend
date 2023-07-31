import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";

const ProductPage = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams("");

  const navigate = useNavigate();

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

  console.log(data);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <main>
      <div className="container">
        <div className="content-box">
          <Carousel images={data.product_image} />
          <div>
            <p className="price">{data.product_price}&nbsp;€</p>
            <table>
              <tbody>
                {data.product_details.map((info, index) => {
                  const infoTitle = Object.keys(info)[0];
                  const infoToDisplay = info[infoTitle];

                  return (
                    <tr key={index}>
                      <td>{infoTitle}</td>
                      <td>{infoToDisplay}</td>
                    </tr>
                  );
                })}
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
            <button
              onClick={() => {
                navigate(`/payment/${id}`);
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
