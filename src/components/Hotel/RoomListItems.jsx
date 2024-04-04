import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
    navigate(`/hoteldetail/${hotelId}`);
    console.log(roomId);
  };
  const onEdit = () => {
    changeEdit(true);
  };

  return (
    <>
      {roomLists?.map((it) => (
        <li
          {...props}
          key={it.id}
          className={it.active_status === "INACTIVE" ? "disabled" : ""}
        >
          {isEdit ? (
            <RoomEditfromEdit setIsEdit={changeEdit} roomData={it} />
          ) : (
            <div>
              <RoomPicture
                image={
                  it.thumbnails?.length > 0 ? it.thumbnails[0].img_url : room2
                }
              />
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
                  <button className="btn-blue-outline">
                    {" "}
                    {it.active_status === "INACTIVE" ? "Sold Out" : "예약하기"}
                  </button>
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
    </>
  );
};

export default RoomListItems;
