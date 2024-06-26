import "../../styles/components/hotel.css";

import React, { useEffect, useState } from "react";

import instance from "../../api/axios";
import request from "../../api/request";
import HotelListItems from "./HotelListItems";

const HotelFavoriteList = ({ className, ...props }) => {
  const token = localStorage.getItem("token");
  const { fetchMembersMyFav } = request;
  const [myFavList, setmyFavList] = useState([]);

  useEffect(() => {
    const fetchFavData = async () => {
      let myFav = "";
      try {
        const responFavList = await instance.get(`${fetchMembersMyFav}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        myFav = responFavList;
        setmyFavList(responFavList.data.result.content);
      } catch (error) {
        console.log(error);
      } finally {
        // console.log(myFav);
      }
    };
    fetchFavData();
  }, [myFavList]);

  return (
    <>
      <ul className={`hotel ${className}`} {...props}>
        {myFavList.map((hotel) => (
          <HotelListItems key={hotel.id} hotel={hotel} />
        ))}
      </ul>
    </>
  );
};

export default HotelFavoriteList;
