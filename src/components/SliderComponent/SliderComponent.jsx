import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const SliderComponent = ({ priceValues, setPriceValues }) => {
  const [values, setValues] = useState([0, 50]);

  const handleChange = (values) => {
    const newArray = [...values];
    setValues(newArray);
  };

  const handleFinalChange = () => {
    setPriceValues(values);
  };

  return (
    <div>
      <Range
        values={values}
        step={1}
        min={0}
        max={250}
        onChange={handleChange}
        onFinalChange={handleFinalChange}
        renderTrack={({ props, children }) => {
          return (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
                padding: "10px",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: values,
                    colors: ["#F5F6F7", "#2FB0BA", "#F5F6F7"],
                    min: 0,
                    max: 250,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          );
        }}
        renderThumb={({ props }) => {
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: "24px",
                width: "24px",
                borderRadius: "50%",
                backgroundColor: "#2FB0BA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  fontFamily: "Arial",
                  fontSize: "12px",
                  top: "-24px",
                  color: "white",
                }}
              >
                {props["aria-valuenow"]}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SliderComponent;
