import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import request from "../../api/request";
import { digit3 } from "../../store/digit3";
import { useReservationStore } from "../../store/reservationStore";
import { useReserveRoomStore } from "../../store/reserveRoomStore";
import Dialog from "../Dialog";
import GuestCounter from "../GuestCounter";
import Input from "../Input";
import Loading from "../Loading";
import Loading2 from "../Loading2";
import Toast from "../Toast";
import Box from "../Box";
import "../../styles/pages/reservation.css";

// 달력 현재날짜 고정
const Today = (nextDay = 0) => {
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate() + nextDay;

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
};

const ReservationFirst = () => {
  const token = localStorage.getItem("token");
  const { fetchOrders } = request;
  const navigate = useNavigate();
  const { addInfo } = useReservationStore();
  const [isWidth, setIsWidth] = useState(window.innerWidth);
  const ref = useRef();
  const [isToggle, setIsToggle] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [isToast2, setIsToast2] = useState(false);
  const [isStart, setIsStart] = useState(Today());
  const [isEnd, setIsEnd] = useState(Today(1));
  const [errrorMessage, setErrrorMessage] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const { reservedRoom } = useReserveRoomStore();
  const dayPrice = reservedRoom.standard_price; //객실기준가

  const [price1, setPrice1] = useState(""); // 1박가격 x 숙박일
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");

  // console.log(reservedRoom);

  const [isPayInfo, setIsPayInfo] = useState({
    adult_count: 0, //성인
    child_count: 0, //어린이
    adult_pay: reservedRoom.adult_fare, //성인요금
    child_pay: reservedRoom.child_fare, //어린이요금
    adult_fare: 0,
    child_fare: 0,
    total_price: reservedRoom.standard_price, // 총금액
  });
  const [orderFirst, setOrderFirst] = useState({
    room_id: reservedRoom.id,
    check_in: "",
    check_out: "",
    adult_count: "",
    child_count: "",
  });
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleStart = (check_in) => {
    setIsStart(check_in);
    setOrderFirst({ ...orderFirst, check_in });
    setIsPayInfo({ ...isPayInfo, check_in });
  };
  const handleEnd = (check_out) => {
    setIsEnd(check_out);
    setOrderFirst({ ...orderFirst, check_out });
    setIsPayInfo({ ...isPayInfo, check_out });
  };
  const handleAdult = (adult_count) => {
    setOrderFirst({ ...orderFirst, adult_count });
    setIsPayInfo({ ...isPayInfo, adult_count });
  };
  const handleChildren = (child_count) => {
    setOrderFirst({ ...orderFirst, child_count });
    setIsPayInfo({ ...isPayInfo, child_count });
  };

  const handleToggle = (e) => {
    e.preventDefault();

    setIsToggle(!isToggle);
    if (isToggle) {
      ref.current.style.height = "27rem";
      setIsToggle(false);
    } else {
      ref.current.style.height = "0";
      setIsToggle(true);
    }
  };

  const CheckEmpty = () => {
    let isValid = true;
    if (!isPayInfo.check_in) {
      setIsPopup(true);
      setErrrorMessage("체크인 날짜를 선택해주세요.");
      isValid = false;
    } else if (!isPayInfo.check_out) {
      setIsPopup(true);
      setErrrorMessage("체크아웃 날짜를 선택해주세요.");
      isValid = false;
    } else if (isPayInfo.adult_count + isPayInfo.child_count > reservedRoom.maximum_capacity) {
      setIsPopup(true);
      setErrrorMessage(`해당 객실은 ${reservedRoom.maximum_capacity}명까지 수용가능한 객실입니다. 인원수를 조절해주세요.`);
      isValid = false;
    } else if (isPayInfo.adult_count + isPayInfo.child_count === 0) {
      setIsPopup(true);
      setErrrorMessage(`최소 1명이상 예약해 주세요.`);
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWidth(window.innerWidth);
      if (ref.current && window.innerWidth > 1024) {
        ref.current.removeAttribute("style");
        setIsToggle(true);
      }
    };

    const handleCalculate = () => {
      const countMember = parseInt(isPayInfo.adult_count) + parseInt(isPayInfo.child_count); // 총인원수
      const checkIn = new Date(isPayInfo.check_in);
      const checkOut = new Date(isPayInfo.check_out);
      const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 일수
      const basePrice = days * parseInt(dayPrice); // 1박가격 x 숙박일
      setPrice1(basePrice);

      // 인원수초과
      if (reservedRoom.maximum_capacity < countMember) {
        setIsToast(true);

        // 추가금액범위
      } else if (countMember > reservedRoom.standard_capacity && countMember <= reservedRoom.maximum_capacity) {
        if (isPayInfo.adult_count === reservedRoom.maximum_capacity) {
          setIsPayInfo({ ...isPayInfo, child_fare: 0 });
          // console.log("같을경우 아이0원");
        } else {
          // console.log("실제계산");
          let adult = (parseInt(isPayInfo.adult_count) - reservedRoom.standard_capacity) * isPayInfo.adult_pay * parseInt(days); // 어른수 x 어른가격 * 숙박일
          let child = parseInt(isPayInfo.child_count) * isPayInfo.child_pay * parseInt(days); // 아이수 x 아이가격 * 숙박일
          setIsPayInfo({ ...isPayInfo, adult_fare: adult, child_fare: child });
          // console.log("어른 : " + adult);
          // console.log("아이 : " + child);
        }
      } else if (countMember <= reservedRoom.standard_capacity) {
        setIsToast(false);
        setIsPayInfo({ ...isPayInfo, adult_fare: 0, child_fare: 0, total_price: price1 });
        // setIsToast2(true);
        // setIsToast2(false);
      }
      const totalPay = isPayInfo.adult_fare + isPayInfo.child_fare + price1;
      setIsPayInfo({ ...isPayInfo, total_price: totalPay });

      //       console.log(`
      // 총인원 : ${countMember}
      // 공짜기준 : ${reservedRoom.standard_capacity},
      // 어른돈 : ${isPayInfo.adult_fare}, 어른수 : ${isPayInfo.adult_count}, 아이돈 : ${isPayInfo.child_fare}, 아이수 : ${isPayInfo.child_count}`);
    };

    window.addEventListener("resize", handleResize);
    handleCalculate();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [price2, isPayInfo.adult_count, isPayInfo.child_count, isPayInfo.check_in, isPayInfo.check_out, isPayInfo.adult_fare, isPayInfo.child_fare]);

  // 결제다음단계 넘기기
  const handleReservation = async (e) => {
    e.preventDefault();
    const isValidCheck = CheckEmpty();

    // console.log(orderFirst);
    // console.log(isPayInfo);

    // 로그인체크
    if (!isLoggedIn()) {
      setIsPopup(true);
      setErrrorMessage(`예약하기 위해선 로그인이 필요합니다.`);
      return;
    } else if (!isValidCheck) return;
    let orderId = "";

    try {
      setIsLoading2(true);
      const responseOrder = await instance.post(fetchOrders, orderFirst, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await setIsLoading(true);
      orderId = responseOrder.data.result.id;
      // setMyId(orderId);
      await addInfo(responseOrder); // 예약결과전역상태로 넘기기
      // await console.log(orderId); //post이후 병합데이터
    } catch (error) {
      console.log(`submitReservation :`, error);
    } finally {
      setTimeout(async () => {
        setIsLoading2(false);
        setIsLoading(false);
        await navigate(`/reservation/?${orderId}`);
      }, 2000);
    }
  };

  // 장바구니 넘기기
  const handleCart = async (e) => {
    e.preventDefault();
    const isValidCheck = CheckEmpty();
    if (isValidCheck) {
      try {
        setIsLoading2(true);
        await instance.post(fetchOrders, orderFirst, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        // console.log(responseCart);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading2(false);
      }
    }
  };

  // form핸들링
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="relative">
        <Box className={"white !py-3 !px-4 mb-3"}>
          <ul className="flex gap-6 text-base">
            <li>
              룸종류 : <b>{reservedRoom.type ? reservedRoom.type : "-"}</b>
            </li>
            <li>
              침대타입 : <b>{reservedRoom.bed_type ? reservedRoom.bed_type : "-"}</b>
            </li>
            <li>
              객실뷰 : <b>{reservedRoom.view_type ? reservedRoom.view_type : "-"}</b>
            </li>
          </ul>
        </Box>
        <form className="reservation-write" onSubmit={handleSubmit}>
          <ul ref={ref} className="mobile:overflow-hidden mobile:h-0 tablet:overflow-visible tablet:h-[auto] transition-all duration-300">
            <li>
              <label htmlFor="reser1" className="--title">
                체크인
              </label>
              <Input type="date" name="start" min={Today()} value={isStart} onChange={handleStart} />
            </li>
            <li>
              <label htmlFor="reser2" className="--title">
                체크아웃
              </label>
              <Input type="date" name="end" min={isStart ? isStart : Today(1)} value={isEnd} onChange={handleEnd} />
            </li>
            <li>
              <strong className="--title">성인(청소년)</strong>
              <GuestCounter iscount={handleAdult} max={reservedRoom.maximum_capacity} />
            </li>
            <li>
              <strong className="--title">어린이</strong>
              <GuestCounter kids iscount={handleChildren} max={reservedRoom.maximum_capacity} />
            </li>
            <li className="!grid grid-cols-2">
              <strong className="--title">성인 ⨉ {isPayInfo.adult_count ? isPayInfo.adult_count : 0}</strong>
              <span className="--total justify-self-end">₩ {isPayInfo.adult_fare ? digit3(isPayInfo.adult_fare) : 0}</span>
              <strong className="--title">어린이 ⨉ {isPayInfo.child_count ? isPayInfo.child_count : 0}</strong>
              <span className="--total justify-self-end">₩ {isPayInfo.child_fare ? digit3(isPayInfo.child_fare) : 0}</span>
              <strong className="--title">기본숙박료</strong>
              <span className="--total justify-self-end">₩ {price1 ? digit3(price1) : 0}</span>
            </li>
            <li>
              <strong className="--title !text-lg">총 금액</strong>
              <span className="--total justify-self-end">₩ {isPayInfo.total_price ? digit3(isPayInfo.total_price) : 0}</span>
            </li>
          </ul>
          <div className="grid grid-cols-[1.7fr_1fr] gap-3">
            {isWidth < 1024 && (
              <button onClick={handleToggle} className="absolute left-2/4 -top-9 z-10 -translate-x-2/4 w-12 h-8 bg-gray-100 rounded-full flex justify-center pt-[0.3rem] text-2xl">
                <MdKeyboardDoubleArrowUp className={`ico-toggle ${!isToggle ? "active" : ""}`} />
              </button>
            )}
            <button className="btn-blue xl2 mobile:h-12 tablet:h-auto mobile:!text-base tablet:!text-xl justify-center" onClick={handleReservation}>
              예약하기
            </button>
            <button className="btn-green-outline xl2 mobile:h-12 tablet:h-auto mobile:!text-base tablet:!text-xl justify-center whitespace-nowrap" onClick={handleCart}>
              장바구니
            </button>
          </div>
        </form>
        {isLoading2 && <Loading2 />}
      </div>
      {isToast && (
        <Toast onOpen={isToast} onClose={() => setIsToast(false)} color={"red"}>
          인원수가 초과되었습니다. 최대 {reservedRoom.maximum_capacity}명 수용 가능합니다.
        </Toast>
      )}
      {isToast2 && (
        <Toast onOpen={isToast2} onClose={() => setIsToast(false)} color={"blue"}>
          해당 숙소는 {reservedRoom.standard_capacity + 1}인이상 {reservedRoom.maximum_capacity}이하면 추가금액이 발생합니다.
        </Toast>
      )}
      <Dialog open={isPopup} close={() => setIsPopup(false)}>
        <div className="text-center">
          <div className="text-center pb-3">{errrorMessage}</div>
          <button className="btn-blue" onClick={() => setIsPopup(false)}>
            확인
          </button>
        </div>
      </Dialog>
      {isLoading && <Loading />}
    </>
  );
};

export default ReservationFirst;
