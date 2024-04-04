import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import room from "../../../assets/hotelroom1.jpeg";
import { usehotelListStore } from "../../../store/hotelListStore";
import { useReserveRoomStore } from "../../../store/reserveRoomStore";
import { useRoomStore } from "../../../store/roomStore";
import HotelPrice from "../HotelPrice";
import HotelTitle from "../HotelTitle";
import RoomOptions from "../RoomOptions";
import RoomPicture from "../RoomPicture";

const RoomListItemsToRead = ({ roomLists, edit, ...props }) => {
  const show = { able: "disabled" };
  const { totalHotels } = usehotelListStore();
  const { addRoom, reservedRoom } = useReserveRoomStore();
  let { hotelId } = useParams();
  const { rooms, deleteRoom } = useRoomStore();
  const thisHotel = totalHotels.find((hotel) => hotel.id === Number(hotelId));
  const [roomsInfo, setRoomsInfo] = useState({});
  const onDelete = (roomId) => {
    deleteRoom(roomId);
    // console.log("룸" + roomId);
  };
  // console.log("룸", roomLists?.[0].thumbnails[0].img_url);
  useEffect(() => {
    axios
      .get(`http://52.78.12.252:8080/api/hotels/${hotelId}`)
      .then((response) => {
        setRoomsInfo(response.data.result.rooms);
        // console.log(response.data.result.rooms);
      });
    // setTitle(hotelInfo.name, SubVisual);
  }, []);

  const clickToReserve = (id) => {
    const clickedItem = roomsInfo?.find((it) => it.id === id);

    addRoom(clickedItem);
  };
  // console.log(reservedRoom);
  return (
    <>
      {roomLists?.map((it) => (
        <li
          className={it.active_status === "INACTIVE" ? "disabled" : ""}
          {...props}
          key={it.id}
        >
          <div>
            <RoomPicture
              // image={
              //   roomLists.thumbnails > 0 ? roomLists.thumbnails?.img_url : room2
              // }
              image={it.thumbnails.length > 0 ? it.thumbnails[0].img_url : room}
            />
            <HotelTitle title={it.type} />
            <HotelPrice price={it.standard_price} />
            <RoomOptions />
            {!edit ? (
              <div className="flex gap-2">
                <button
                  onClick={() => clickToReserve(it.id)}
                  className="btn-blue-outline mobile:flex-1 tablet:flex-none justify-center"
                >
                  {it.active_status === "INACTIVE" ? "Sold Out" : "예약하기"}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button className="btn-blue-outline">수정하기</button>
                <button
                  className="btn-red-outline"
                  onClick={() => {
                    onDelete(it.roomId);
                  }}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </>
  );
};

export default RoomListItemsToRead;
