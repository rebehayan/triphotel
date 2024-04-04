import "../../styles/components/hotel.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { TbRotateClockwise2 } from "react-icons/tb";

import HotelListItems from "./HotelListItems";

const HotelList = ({ className, ...props }) => {
  const [hotels, setHotels] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const handleMore = () => {
    setIsLoading(true);
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    axios
      .get(
        `http://52.78.12.252:8080/api/hotels?page=${currentPage}&size=${pageSize}`
      )
      .then((response) => {
        // 기존 호텔 목록에 새로운 호텔 목록 추가
        setHotels((prevHotels) => [
          ...prevHotels,
          ...response.data.result.content,
        ]);
        // 페이지 번호 증가
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://52.78.12.252:8080/api/hotels?page=0&size=${pageSize}`)
        .then((response) => {
          // console.log(response.data.result.content);
          setHotels(response.data.result.content);
        });
    };
    fetchData();
  }, []);

  // console.log(hotels);

  return (
    <>
      <ul className={`hotel ${className}`} {...props}>
        {hotels.map((hotel) => (
          <HotelListItems key={hotel.id} hotel={hotel} />
        ))}
      </ul>
      <div className="text-center mt-10">
        <button className="btn-blue xl" onClick={handleMore}>
          {isLoading ? (
            <TbRotateClockwise2 className="animate-spin" />
          ) : (
            <FaArrowDownShortWide />
          )}
          {isLoading ? "Loading..." : "호텔 더보기"}
        </button>{" "}
      </div>
    </>
  );
};

export default HotelList;
