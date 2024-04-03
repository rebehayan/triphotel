import React, { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiMiniHeart } from "react-icons/hi2";

const HotelFavorite = ({ onClick, checked, ...props }) => {
  return (
    <button className="hotel__fav" onClick={onClick} {...props}>
      {!checked ? <HiOutlineHeart /> : <HiMiniHeart className="--active" />}
    </button>
  );
};

export default HotelFavorite;
