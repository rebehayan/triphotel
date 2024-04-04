import React from "react";

const HotelBooking = ({ onClick, text, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-blue-label hotel__booking"
    >
      {text}
    </button>
  );
};

export default HotelBooking;
