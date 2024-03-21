import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import MypageAccount from "../components/Mypage/MypageAccount";
import { useVisualStore } from "../store/visualStore";
import MypageFavorite from "../components/Mypage/MypageFavorite";
import MypageCart from "../components/Mypage/MypageCart";
import MypageReservation from "../components/Mypage/MypageReservation";
import subvisual from "../assets/subvisual4.jpg";
import MypageAllReservation from "../components/Mypage/MypageAllReservation";

const Mypage = () => {
  const { setTitle } = useVisualStore();
  const [isTab, setIsTab] = useState("account");
  const handleTab = (tab) => {
    setIsTab(tab);
  };
  useEffect(() => {
    setTitle("My Page", subvisual);
  }, [setTitle]);

  return (
    <div className="main bg-gray-100">
      <div className="container mypage pt-10 pb-20">
        <Heading tag={"h3"} text={"마이 페이지"} className={"xl"} />
        <nav>
          <ul className="tab">
            <li>
              <button className={isTab === "account" ? "--active" : ""} onClick={() => handleTab("account")}>
                개인정보
              </button>
            </li>
            <li>
              <button className={isTab === "favorite" ? "--active" : ""} onClick={() => handleTab("favorite")}>
                즐겨찾는 숙소
              </button>
            </li>
            <li>
              <button className={isTab === "cart" ? "--active" : ""} onClick={() => handleTab("cart")}>
                장바구니
              </button>
            </li>
            <li>
              <button className={isTab === "reservation" ? "--active" : ""} onClick={() => handleTab("reservation")}>
                나의 예약내역
              </button>
            </li>
            <li>
              <button
                className={isTab === "allReservation" ? "--active" : ""}
                onClick={() => handleTab("allReservation")}
              >
                회원 예약 신청내역
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-10">
          {isTab === "account" && <MypageAccount />}
          {isTab === "favorite" && <MypageFavorite />}
          {isTab === "cart" && <MypageCart />}
          {isTab === "reservation" && <MypageReservation />}
          {isTab === "allReservation" && <MypageAllReservation />}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
