import "../../styles/components/hotel.css";

import React, { useEffect, useState } from "react";

import axios from "axios";

import { usehotelListStore } from "../../store/hotelListStore";
import HotelListItems from "./HotelListItems";

const HotelList = ({ modify, className, ...props }) => {
  const data = { state: "disabled" };

  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios.get("http://52.78.12.252:8080/api/hotels").then((response) => {
      console.log(response.data.result.content);
      setHotels(response.data.result.content);
    });
  }, []);
  const totalHotels = usehotelListStore((state) => state.totalHotels);

  return (
    <>
      <ul className={`hotel ${className}`} {...props}>
        <HotelListItems modify={modify} />
      </ul>
    </>
  );
};

export default HotelList;
