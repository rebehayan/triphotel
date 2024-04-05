import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import instance from "../../api/axios";
import request from "../../api/request";
import hotel1 from "../../assets/hotel1.jpg";
import { digit3 } from "../../store/digit3";
import Badge from "../Badge";
import HotelBooking from "./HotelBooking";
import HotelFavorite from "./HotelFavorite";
import HotelLocation from "./HotelLocation";
import HotelPicture from "./HotelPicture";
import HotelPrice from "./HotelPrice";
import HotelTitle from "./HotelTitle";
import { useReserveRoomStore } from "../../store/reserveRoomStore";

const HotelListItems = ({ hotel }) => {
  const token = localStorage.getItem("token");
  const [isFav, setIsFav] = useState(hotel.favorite);
  const { fetchHotels } = request;
  const { addRoom } = useReserveRoomStore();
  const navigate = useNavigate();

  // console.log(hotel.favorite);

  const handleFavorite = async () => {
    setIsFav(!isFav);
    let myfav = "";
    try {
      const isfavs = await instance.post(`${fetchHotels}/${hotel.id}/favorite`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      myfav = isfavs;
    } catch (error) {
      console.log(error);
    } finally {
      console.log(myfav);
    }
  };

  const handleResetStore = (e) => {
    e.preventDefault();
    addRoom({});
    navigate(`/hoteldetail/${hotel.id}`);
  };
  const onBooking = (id) => {
    addRoom({});
    navigate(`/hoteldetail/${id}`);
  };
  return (
    <>
      <li className={hotel.active_status === "ACTIVE" ? "" : "disabled"}>
        <HotelPicture onClick={handleResetStore} image={hotel.thumbnails?.length < 4 ? hotel1 : hotel.thumbnails?.[0].img_url} />
        <div className="hotel__info">
          <HotelLocation location={hotel.nation} />
          <HotelFavorite onClick={handleFavorite} checked={isFav} />
          <HotelTitle title={hotel.name} onClick={handleResetStore} />
          <HotelPrice price={digit3(hotel.rooms[0]?.standard_price)} />
          {hotel.active_status === "ACTIVE" ? (
            <HotelBooking text={"HotelBooking"} onClick={() => onBooking(hotel.id)} />
          ) : (
            <>
              <HotelBooking disabled text={"Sold Out"} />
              <Badge color={"red"}>Sold Out</Badge>
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default HotelListItems;
