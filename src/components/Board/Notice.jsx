import React, { useState } from "react";
import NoticeItem from "./NoticeItem";
import "../../styles/components/board.css";

const Notice = ({ className, notices, myId }) => {
  // console.log(notices);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleDelete = (index) => {
    // const updatedNoticeItems = [...noticeItems];
    // updatedNoticeItems.splice(index, 1);
    // setNoticeItems(updatedNoticeItems);
    setActiveIndex(null); // 삭제 후 활성화된 인덱스 초기화
  };

  return (
    <div>
      <ul className={`notice-list ${className}`}>
        {notices.length > 0 ? (
          notices.map((item, index) => (
            <NoticeItem
              myId={myId}
              key={index}
              index={index}
              item={item}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <li className="bg-white text-center">등록된 공지사항이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default Notice;
