import "../../styles/components/hotel.css";

import React, { useEffect, useState } from "react";

import { FaArrowDownShortWide } from "react-icons/fa6";
import { TbRotateClockwise2 } from "react-icons/tb";

import instance from "../../api/axios";
import request from "../../api/request";
import HotelListItems from "./HotelListItems";

const HotelList = ({ className, ...props }) => {
  const [hotels, setHotels] = useState([]);
  const { fetchHotels } = request;
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const handleMore = async () => {
    setIsLoading(true);
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    try {
      const response = await instance.get(
        `${fetchHotels}?page=${currentPage}&size=${pageSize}`
      );
      console.log(response);
      const newHotels = response.data.result.content;
      setHotels((prevHotels) => [
        ...prevHotels,
        ...response.data.result.content,
      ]);

      setCurrentPage((prevPage) => prevPage + 1);
      setHasMore(newHotels.length === pageSize);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `${fetchHotels}?page=0&size=${pageSize}`
        );

        const initialHotels = response.data.result.content;
        setHotels(response.data.result.content);
        setHasMore(initialHotels.length === pageSize);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ul className={`hotel ${className}`} {...props}>
        {hotels.map((hotel) => (
          <HotelListItems key={hotel.id} hotel={hotel} />
        ))}
      </ul>
      <div className="text-center mt-10">
        {hasMore && (
          <button className="btn-blue xl" onClick={handleMore}>
            {isLoading ? (
              <TbRotateClockwise2 className="animate-spin" />
            ) : (
              <FaArrowDownShortWide />
            )}
            {isLoading ? "Loading..." : "호텔 더보기"}
          </button>
        )}
      </div>
    </>
  );
};

export default HotelList;
