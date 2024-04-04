import React, { useEffect } from "react";

import { digit3 } from "../../store/digit3";
import { useSearchStore } from "../../store/searchStore";
import HotelFavorite from "./HotelFavorite";
import HotelLocation from "./HotelLocation";
import HotelPicture from "./HotelPicture";
import HotelPrice from "./HotelPrice";
import HotelTitle from "./HotelTitle";

const ResultListItems = ({ modify, ...props }) => {
  // const data = { state: "disabled" };
  const { searchResults } = useSearchStore((state) => state);

  useEffect(() => {}, [searchResults]);

  return (
    <>
      {searchResults.map((hotel) => (
        <li key={hotel.name}>
          <HotelPicture
            link={`/hoteldetail/${hotel.id}`}
            image={hotel.thumbnails?.[0].img_url}
          />
          <div className="hotel__info">
            <HotelLocation location={hotel.nation} />
            <HotelFavorite checked={modify} />
            <HotelTitle link={`/hoteldetail/${hotel.id}`} title={hotel.name} />
            <HotelPrice price={digit3(hotel.rooms?.[0].standard_price)} />
          </div>
        </li>
      ))}
    </>
  );
};

export default ResultListItems;
