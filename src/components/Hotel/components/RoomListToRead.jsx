import "../../../styles/components/room.css";

import React from "react";

import RoomListItemsToRead from "./RoomListsITemstoRead";

const RoomListToRead = ({ roomLists, className, edit, checkRommInfo, ...props }) => {
  return (
    <ul className={`room-list ${className}`} {...props}>
      <RoomListItemsToRead roomLists={roomLists} edit={edit} checkRommInfo={checkRommInfo} />
    </ul>
  );
};

export default RoomListToRead;
