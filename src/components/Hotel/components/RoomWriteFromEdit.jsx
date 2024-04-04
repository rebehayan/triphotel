import React, { useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { usehotelListStore } from "../../../store/hotelListStore";
import { useRoomFromEditStore } from "../../../store/roomFromEditStore";
import Box from "../../Box";
import Dialog from "../../Dialog";
import Input from "../../Input";
import Radio from "../../Radio";
import Select from "../../Select";

const viewOption = [
  {
    value: "OCEAN",
    text: "오션뷰",
  },
  {
    value: "CITY",
    text: "시티뷰",
  },
  {
    value: "GARDEN",
    text: "가든뷰",
  },
  {
    value: "RIVER",
    text: "리버뷰",
  },
  {
    value: "MOUNTAIN",
    text: "마운틴뷰",
  },
  {
    value: "NONE",
    text: "뷰없음",
  },
];
const bedOption = [
  {
    value: "SINGLE",
    text: "싱글/트윈 베드",
  },
  {
    value: "DOUBLE",
    text: "더블베드",
  },
  {
    value: "QUEEN",
    text: "퀸베드",
  },
  {
    value: "KING",
    text: "킹베드",
  },
];
const roomOption = [
  {
    value: "STANDARD",
    text: "스탠다드 룸",
  },
  {
    value: "DELUXE",
    text: "디럭스 룸",
  },
  {
    value: "TWIN",
    text: "트윈 룸",
  },
  {
    value: "SWEET",
    text: "스위트 룸",
  },
];
const RoomWriteFromEdit = ({ setIsToggle }) => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { totalHotels, addHotel } = usehotelListStore();
  const { rooms, addRoom } = useRoomFromEditStore();
  const [isRadio, setIsRadio] = useState(false);
  const [image, setImage] = useState();
  const [isPopup, setIsPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [roomInfo, setRoomInfo] = useState({
    type: "STANDARD",
    active_status: "ACTIVE",
    bed_type: "SINGLE",
    standard_capacity: null,
    maximum_capacity: null,
    view_type: "OCEAN",
    standard_price: null,
    adult_fare: null,
    child_fare: null,
  });

  const handleRoomType = (e) => {
    const selectedOption = roomOption.find((option) => option.text === e.target.value);

    if (selectedOption) {
      setRoomInfo((prev) => ({
        ...prev,
        type: selectedOption.value,
      }));
    }
  };
  const handleBed = (e) => {
    const selectedOption = bedOption.find((option) => option.text === e.target.value);

    if (selectedOption) {
      setRoomInfo((prev) => ({
        ...prev,
        bed_type: selectedOption.value,
      }));
    }
  };
  const handleView = (e) => {
    const selectedOption = viewOption.find((option) => option.text === e.target.value);

    if (selectedOption) {
      setRoomInfo((prev) => ({
        ...prev,
        view_type: selectedOption.value,
      }));
    }
  };
  const handlePrice = (value) => {
    setRoomInfo({ ...roomInfo, standard_price: value });
  };
  const handleAdultFare = (value) => {
    setRoomInfo({ ...roomInfo, adult_fare: value });
  };
  const handleChildFare = (value) => {
    setRoomInfo({ ...roomInfo, child_fare: value });
  };
  const handleCapacity = (value) => {
    setRoomInfo({ ...roomInfo, standard_capacity: value });
  };
  const handleMax = (value) => {
    setRoomInfo({ ...roomInfo, maximum_capacity: value });
  };
  const handleRadioChange = (value) => {
    setRoomInfo({ ...roomInfo, active_status: value });
  };
  const handleImageChange = (file) => {
    setImage(file);
  };
  const token = localStorage.getItem("token");
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("request", JSON.stringify(roomInfo));
    formData.append("file", image);

    try {
      const response = await axios.post(`https://be7-team4.r-e.kr/api/hotels/${hotelId}/rooms`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
    setPopupMessage("객실을 새로 등록했습니다.");
    setIsPopup(true);
    // addRoom(roomInfo);
  };
  const onConfirm = () => {
    navigate(`/hoteldetail/${hotelId}`);
  };
  const thisHotel = totalHotels.find((hotel) => hotel.id === Number(hotelId));
  const onCancel = () => {
    setIsToggle(false);
  };

  return (
    <>
      <Box className={"white mt-5"}>
        <form>
          <ul className="grid mobile:grid-cols-1 tablet:grid-cols-3 gap-10">
            <li className="grid gap-3 self-start">
              객실 종류
              <Select options={roomOption} onChange={handleRoomType} />
            </li>
            <li className="grid gap-3 self-start">
              객실 침대 정보
              <Select options={bedOption} onChange={handleBed} />
            </li>
            <li className="grid gap-3">
              객실 뷰 종류
              <Select options={viewOption} onChange={handleView} />
            </li>
            <li className="grid gap-3 self-start">
              객실 1박 가격
              <div className="grid grid-cols-[1fr_min-content] items-center gap-1">
                {/* <Input
                  type={"text"}
                  value={roomInfo.standard_price}
                  price={true}
                  onChange={handlePrice}
                />{" "} */}
                <Input type={"number"} value={roomInfo.standard_price} onChange={handlePrice} /> 원
              </div>
            </li>
            <li className="grid gap-3 self-start">
              성인 1명당 1박 가격
              <div className="grid grid-cols-[1fr_min-content] items-center gap-1">
                <Input type={"number"} onChange={handleAdultFare} /> 원
              </div>
            </li>
            <li className="grid gap-3 self-start">
              어린이 1명당 1박 가격
              <div className="grid grid-cols-[1fr_min-content] items-center gap-1">
                <Input type={"number"} onChange={handleChildFare} /> 원
              </div>
            </li>
            <li className="grid gap-3 self-start">
              객실 기준인원
              <div className="grid grid-cols-[1fr_min-content] items-center gap-1">
                <Input type={"number"} onChange={handleCapacity} /> 명
              </div>
            </li>
            <li className="grid gap-3 self-start">
              객실 최대인원
              <div className="grid grid-cols-[1fr_min-content] items-center gap-1">
                <Input type={"number"} onChange={handleMax} /> 명
              </div>
            </li>
            <li className="grid gap-3">
              객실 예약여부
              <div className="flex">
                <Radio color={"blue"} checked={roomInfo.active_status === "ACTIVE"} value={"예약가능"} id={"room_reser1"} name={"roomrag1"} onChange={() => handleRadioChange("ACTIVE")} />
                <Radio color={"red ml-5"} checked={roomInfo.active_status === "INACTIVE"} value={"예약 불가능"} id={"room_reser2"} name={"roomrag1"} onChange={() => handleRadioChange("INACTIVE")} />
              </div>
            </li>
            <li className="grid gap-3 mobile:col-span-1 tablet:col-span-3">
              객실 사진
              <Input type={"file"} onChange={handleImageChange} />
            </li>
          </ul>
        </form>
      </Box>
      <div className="flex gap-3 justify-center mt-5">
        <button className="btn-blue" onClick={onSubmit}>
          객실 등록
        </button>

        <button className="btn-gray" onClick={onCancel}>
          취소
        </button>
        <Dialog open={isPopup} close={() => setIsPopup(false)}>
          <div className="text-center">
            <div className="text-center pb-3">{popupMessage}</div>
            <button className="btn-blue" onClick={onConfirm}>
              확인
            </button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default RoomWriteFromEdit;
