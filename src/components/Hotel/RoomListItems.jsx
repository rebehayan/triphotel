import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import room2 from "../../assets/hotelroom2.jpeg";
import { useRoomEditStore } from "../../store/roomEditStore";
import { useRoomStore } from "../../store/roomStore";
import Dialog from "../Dialog";
import RoomEditfromEdit from "./components/RoomEditfromEdit";
import HotelPrice from "./HotelPrice";
import HotelTitle from "./HotelTitle";
import RoomOptions from "./RoomOptions";
import RoomPicture from "./RoomPicture";
import request from "../../api/request";
import instance from "../../api/axios";

const RoomListItems = ({ roomLists, edit, ...props }) => {
  const { fetchHotels } = request;
  const show = { able: "disabled" };
  const { isEdit, getIsEdit, changeEdit } = useRoomEditStore();
  const [isPopup, setIsPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { hotelId } = useParams();
  const { rooms, deleteRoom } = useRoomStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const onDelete = async (hotelId, roomId) => {
    try {
      const response = await instance.delete(`${fetchHotels}/${hotelId}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setPopupMessage("해당 객실을 삭제했습니다.");
    setIsPopup(true);
  };
  const onEdit = () => {
    changeEdit(true);
  };
  const onConfirm = (id) => {
    navigate(`/hoteldetail/${id}`);
  };
  return (
    <>
      {roomLists?.map((it) => (
        <li {...props} key={it.id} className={it.active_status === "INACTIVE" ? "disabled" : ""}>
          {isEdit ? (
            <RoomEditfromEdit setIsEdit={changeEdit} roomData={it} />
          ) : (
            <div>
              <RoomPicture image={it.thumbnails?.length > 0 ? it.thumbnails[0].img_url : room2} />
              <HotelTitle title={it.type} />
              <HotelPrice price={it.standard_price} />
              <RoomOptions bedtype={it.bed_type} capacity={it.standard_capacity} maximum={it.maximum_capacity} view={it.view_type} adult_fare={it.adult_fare} child_fare={it.child_fare} />
              {!edit ? (
                <div className="flex gap-2">
                  <button className="btn-blue-outline"> {it.active_status === "INACTIVE" ? "Sold Out" : "예약하기"}</button>
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
      <Dialog open={isPopup} close={() => setIsPopup(false)}>
        <div className="text-center">
          <div className="text-center pb-3">{popupMessage}</div>
          <button className="btn-blue" onClick={() => onConfirm(hotelId)}>
            확인
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default RoomListItems;
