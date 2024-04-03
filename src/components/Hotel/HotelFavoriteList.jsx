import React, { useEffect, useState } from "react";
import HotelListItems from "./HotelListItems";
import "../../styles/components/hotel.css";
import instance from "../../api/axios";
import request from "../../api/request";

const HotelFavoriteList = ({ className, ...props }) => {
  const data = { state: "disabled" };
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
        console.log(myFav);
      }
    };
    fetchFavData();
  }, []);

  return (
    <>
      <ul className={`hotel ${className}`} {...props}>
        {myFavList.map((hotel) => (
          <HotelListItems key={hotel.id} hotel={hotel} checkFav={true} />
        ))}
      </ul>
    </>
  );
};

export default HotelFavoriteList;
