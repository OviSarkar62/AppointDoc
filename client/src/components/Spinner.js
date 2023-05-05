import React from "react";
import Spinners from "react-bootstrap/Spinner";

const Spinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center spinner">
        <Spinners animation="border" variant="info" />
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

export default Spinner;
