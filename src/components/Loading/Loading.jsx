import "./Loading.css";
import spinnerSolid from "../../assets/img/spinner-solid.svg";

const Loading = ({ showLoading }) => {
  if (showLoading) {
    return (
      <div className="modal-wrapper">
        <div className="loading-box">
          <img src={spinnerSolid} alt="Loading" />
          <span>Veuillez patienter...</span>
        </div>
      </div>
    );
  }
};

export default Loading;
