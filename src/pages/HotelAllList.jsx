import React, { useEffect, useState } from "react";

import axios from "axios";

import subvisual from "../assets/subvisual1.jpg";
import Destinations from "../components/Destinations";
import Heading from "../components/Heading";
import HotelList from "../components/Hotel/HotelList";
import SearchDetail from "../components/Search/SearchDetail";
import { useVisualStore } from "../store/visualStore";

const HotelAllList = () => {
  const { setTitle } = useVisualStore();
  const [isLoading, setIsLoading] = useState(false);
  const [hotelsLength, setHotelsLength] = useState();
  useEffect(() => {
    setTitle("Trip Hotel List", subvisual);
  }, [setTitle]);

  const handleMore = () => {
    setIsLoading(true);
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  useEffect(() => {
    axios.get(`http://52.78.12.252:8080/api/hotels`).then((response) => {
      setHotelsLength(response.data.result.total_elements);
    });
  }, []);
  return (
    <div className="main pb-20">
      <div className="container">
        <Destinations className="sub" />
        <Heading tag={"h3"} text={"TripHotel 목록"} className={"xl mt-10"} />
        <div className="flex mobile:flex-col tablet:flex-row justify-between items-center mt-10 mb-5">
          <div className="text-2xl mobile:mb-3 tablet:mb-0">
            <strong className="">{hotelsLength}</strong>
            <span className="font-light">의 호텔이 있습니다.</span>
          </div>
          <SearchDetail />
        </div>
        <HotelList />
        {/* <div className="text-center mt-10">
          <button className="btn-blue xl" onClick={handleMore}>
            {isLoading ? (
              <TbRotateClockwise2 className="animate-spin" />
            ) : (
              <FaArrowDownShortWide />
            )}
            {isLoading ? "Loading..." : "호텔 더보기//"}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default HotelAllList;
