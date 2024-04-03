import React, { useEffect, useState } from "react";
import HotelListItems from "./HotelListItems";
import "../../styles/components/hotel.css";
import axios from "axios";
import { usehotelListStore } from "../../store/hotelListStore";

const HotelList = ({ className, ...props }) => {
  const data = { state: "disabled" };

  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios.get("http://52.78.12.252:8080/api/hotels").then((response) => {
      // console.log(response.data.result.content);
      setHotels(response.data.result.content);
    });
  }, []);

  return (
    <>
      <ul className={`hotel ${className}`} {...props}>
        {hotels.map((hotel) => (
          <HotelListItems key={hotel.id} hotel={hotel} checkFav={false} />
        ))}
      </ul>
    </>
  );
};

export default HotelList;
