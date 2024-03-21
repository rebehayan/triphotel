import React from 'react';

import hotel1 from '../../assets/hotel1.jpg';
import Badge from '../Badge';
import HotelBooking from './HotelBooking';
import HotelFavorite from './HotelFavorite';
import HotelLocation from './HotelLocation';
import HotelPicture from './HotelPicture';
import HotelPrice from './HotelPrice';
import HotelTitle from './HotelTitle';

const HotelListItems = ({ modify, ...props }) => {
  const data = { state: "disabled" };
  return (
    <>
      <li {...props}>
        <HotelPicture link={"/hoteldetail"} image={hotel1} />
        <div className="hotel__info">
          <HotelLocation location={"Japan"} />
          <HotelFavorite checked={modify} />
          <HotelTitle
            link={"/hoteldetail"}
            title={"Signature Hitanial Hotel"}
          />
          <HotelPrice price={"1,000,000"} />
          <HotelBooking text={"HotelBooking"} />
        </div>
      </li>
      <li className={data.state}>
        <HotelPicture link={"/hoteldetail"} image={hotel1} />
        <div className="hotel__info">
          <HotelLocation location={"Japan"} />
          <HotelFavorite checked={modify} />
          <HotelTitle
            link={"/hoteldetail"}
            title={"Signature Hitanial Hotel"}
          />
          <HotelPrice price={"1,000,000"} />
          {data.state ? (
            <>
              <HotelBooking disabled text={"Sold Out"} />
              <Badge color={"red"}>Sold Out</Badge>
            </>
          ) : (
            <HotelBooking text={"HotelBooking"} />
          )}
        </div>
      </li>
    </>
  );
};

export default HotelListItems;
