import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <>
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      <div className="loading-text">Laddar...</div>
    </>
  );
};

export default Spinner;
