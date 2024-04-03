import React from "react";

import axios from "axios";

import room from "../../assets/hotelroom1.jpeg";
import room2 from "../../assets/hotelroom2.jpeg";
import { useRoomEditStore } from "../../store/roomEditStore";
import { useRoomStore } from "../../store/roomStore";
import RoomEditfromEdit from "./components/RoomEditfromEdit";
import HotelPrice from "./HotelPrice";
import HotelTitle from "./HotelTitle";
import RoomOptions from "./RoomOptions";
import RoomPicture from "./RoomPicture";

const RoomListItems = ({ roomLists, edit, ...props }) => {
  const show = { able: "disabled" };
  const { isEdit, getIsEdit, changeEdit } = useRoomEditStore();
  // const [isEdit, setIsEdit] = useState(false);
  const { rooms, deleteRoom } = useRoomStore();

  const token = localStorage.getItem("token");
  const onDelete = async (hotelId, roomId) => {
    try {
      const response = await axios.delete(
        `http://52.78.12.252:8080/api/hotels/${hotelId}/rooms/${roomId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // 응답 데이터 처리
      alert("객실 삭제 성공!");
    } catch (error) {
      console.error(error);
    }

    deleteRoom(roomId);
    console.log(roomId);
  };
  const onEdit = () => {
    changeEdit(true);
  };

  console.log(isEdit);
  return (
    <>
      {roomLists?.map((it) => (
        <li {...props} key={it.roomId}>
          {isEdit ? (
            <RoomEditfromEdit setIsEdit={changeEdit} roomData={it} />
          ) : (
            <div>
              <RoomPicture image={room2} />
              <HotelTitle title={it.type} />
              <HotelPrice price={it.standard_price} />
              <RoomOptions
                bedtype={it.bed_type}
                capacity={it.standard_capacity}
                maximum={it.maximum_capacity}
                view={it.view_type}
                adult_fare={it.adult_fare}
                child_fare={it.child_fare}
              />
              {!edit ? (
                <div className="flex gap-2">
                  <button className="btn-blue-outline">예약하기</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button className="btn-blue-outline" onClick={onEdit}>
                    수정하기
                  </button>
                  <button
                    className="btn-red-outline"
                    onClick={() => {
                      onDelete(it.hotel_id, it.id);
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          )}
        </li>
      ))}
      <li className={show.able} {...props}>
        <div>
          <RoomPicture image={room} />
          <HotelTitle title={"스탠다드 룸"} />
          <HotelPrice price={"50,000"} />
          <RoomOptions />
          {!edit ? (
            <div className="flex gap-2">
              <button className="btn-blue-outline mobile:flex-1 tablet:flex-none justify-center">
                {show.able ? "Sold Out" : "예약하기"}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button className="btn-blue-outline">수정하기</button>
              <button className="btn-red-outline">삭제하기</button>
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default RoomListItems;
