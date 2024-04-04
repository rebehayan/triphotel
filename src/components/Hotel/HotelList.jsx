import "../../styles/components/hotel.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { TbRotateClockwise2 } from "react-icons/tb";

import HotelListItems from "./HotelListItems";

const HotelList = ({ className, ...props }) => {
  const [hotels, setHotels] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const handleMore = () => {
    setIsLoading(true);
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    axios
      .get(`https://be7-team4.r-e.kr/api/hotels?page=${currentPage}&size=${pageSize}`)
      .then((response) => {
        const newHotels = response.data.result.content;
        setHotels((prevHotels) => [...prevHotels, ...response.data.result.content]);
        // 페이지 번호 증가
        setCurrentPage((prevPage) => prevPage + 1);
        setHasMore(newHotels.length === pageSize);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`https://be7-team4.r-e.kr/api/hotels?page=0&size=${pageSize}`).then((response) => {
        const initialHotels = response.data.result.content;
        setHotels(response.data.result.content);
        setHasMore(initialHotels.length === pageSize);
      });
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
            {isLoading ? <TbRotateClockwise2 className="animate-spin" /> : <FaArrowDownShortWide />}
            {isLoading ? "Loading..." : "호텔 더보기"}
          </button>
        )}
      </div>
    </>
  );
};

export default HotelList;
