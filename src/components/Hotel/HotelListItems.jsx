import React, { useState } from "react";

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
import { useReservationStore } from "../../store/reservationStore";

const HotelListItems = ({ hotel, checkFav }) => {
  const token = localStorage.getItem("token");
  const [isFav, setIsFav] = useState(hotel.favorite || checkFav);
  const { fetchHotels } = request;
  const { addInfo } = useReservationStore();

  // console.log(hotel);

  const favData = {
    id: hotel.id,
  };
  const handleFavorite = async () => {
    setIsFav(!isFav);
    let myfav = "";
    try {
      const isfavs = await instance.post(`${fetchHotels}/${hotel.id}/favorite`, favData, {
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

  const handleResetStore = () => {
    addInfo({});
  };

  return (
    <>
      <li className={hotel.active_status === "ACTIVE" ? "" : "disabled"} onClick={handleResetStore}>
        <HotelPicture
          link={`/hoteldetail/${hotel.id}`}
          image={hotel.thumbnails?.length < 4 ? hotel1 : hotel.thumbnails?.[0].img_url}
        />
        <div className="hotel__info">
          <HotelLocation location={hotel.nation} />
          <HotelFavorite onClick={handleFavorite} checked={isFav} />
          <HotelTitle link={`/hoteldetail/${hotel.id}`} title={hotel.name} />
          <HotelPrice price={digit3(hotel.rooms[0]?.standard_price)} />
          {hotel.active_status === "ACTIVE" ? (
            <HotelBooking text={"HotelBooking"} />
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
