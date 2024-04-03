import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import category1 from "../assets/category1.jpg";
import category2 from "../assets/category2.webp";
import category3 from "../assets/category3.webp";
import category4 from "../assets/category4.jpg";
import category5 from "../assets/category5.jpg";
import axios from "axios";
import { useSearchStore } from "../store/searchStore";
import Loading2 from "../components/Loading2";
import { useNavigate } from "react-router-dom";

const DestinationsItems = () => {
  const { setSearchTerm } = useSearchStore();
  const [nation, setNation] = useState("");
  const [isLoading2, setIsLoading2] = useState(false);
  const navigate = useNavigate();
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const [hotelCountsByCountry, setHotelCountsByCountry] = useState({});

  useEffect(() => {
    const fetchHotelCounts = async () => {
      const countries = [
        "THAILAND",
        "VIETNAM",
        "PHILIPPINES",
        "MALAYSIA",
        "TAIWAN",
      ];
      let counts = {};

      try {
        await Promise.all(
          countries.map(async (country) => {
            const response = await axios.get(
              `http://52.78.12.252:8080/api/hotels/nation/${country}`
            );
            counts[country] = response.data.result.number_of_elements;
            console.log(country, response.data.result.number_of_elements);
          })
        );
      } catch (error) {
        console.error("국가별 호텔 개수 불러오기 실패:", error);
      } finally {
        setHotelCountsByCountry(counts);
        setIsLoading2(false); // 데이터 로딩 완료
      }
    };

    fetchHotelCounts();
  }, []);

  const handleDestinationClick = async (destination) => {
    setNation(destination.value);
    setSearchTerm(destination.value);
    setIsLoading2(true);

    try {
      const response = await axios.get(
        `http://52.78.12.252:8080/api/hotels/nation/${destination.value}`
      );
      setSearchResults(response.data.result.content);
      console.log(response.data.result.content);
      navigate("/search/result");
    } catch (error) {
      console.error("호텔 검색에 실패했습니다:", error);
      setSearchResults([]);
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <>
      <Link
        onClick={() =>
          handleDestinationClick({ value: "THAILAND", text: "태국" })
        }
      >
        <div className="destinations__thumbnail">
          <img src={category1} alt="태국" />
        </div>
        <div className="destinations__info">
          <strong>Thailand</strong>
          <span>{hotelCountsByCountry["THAILAND"] || 0} Hotels</span>
        </div>
      </Link>
      <Link
        onClick={() =>
          handleDestinationClick({ value: "VIETNAM", text: "베트남" })
        }
      >
        <div className="destinations__thumbnail">
          <img src={category2} alt="베트남" />
        </div>
        <div className="destinations__info">
          <strong>Vietnam</strong>
          <span>{hotelCountsByCountry["VIETNAM"] || 0} Hotels</span>
        </div>
      </Link>
      <Link
        onClick={() =>
          handleDestinationClick({ value: "PHILIPPINES", text: "필리핀" })
        }
      >
        <div className="destinations__thumbnail">
          <img src={category3} alt="필리핀" />
        </div>
        <div className="destinations__info">
          <strong>Philippines</strong>
          <span>{hotelCountsByCountry["PHILIPPINES"] || 0} Hotels</span>
        </div>
      </Link>
      <Link
        onClick={() =>
          handleDestinationClick({ value: "MALAYSIA", text: "말레이시아" })
        }
      >
        <div className="destinations__thumbnail">
          <img src={category4} alt="말레이시아" />
        </div>
        <div className="destinations__info">
          <strong>Malaysia</strong>
          <span>{hotelCountsByCountry["MALAYSIA"] || 0} Hotels</span>
        </div>
      </Link>
      <Link
        onClick={() =>
          handleDestinationClick({ value: "TAIWAN", text: "대만" })
        }
      >
        <div className="destinations__thumbnail">
          <img src={category5} alt="대만" />
        </div>
        <div className="destinations__info">
          <strong>Taiwan</strong>
          <span>{hotelCountsByCountry["TAIWAN"] || 0} Hotels</span>
        </div>
      </Link>
      {isLoading2 && <Loading2 />}
    </>
  );
};

export default DestinationsItems;
