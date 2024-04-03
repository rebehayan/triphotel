import React, { useState } from "react";
import NoticeItem from "./NoticeItem";
import "../../styles/components/board.css";

const Notice = ({ className, ...props }) => {
  const [noticeItems, setNoticeItems] = useState([
    {
      title: "공지사항 제목입니다.1",
      description: "첫 번째 공지사항입니다.",
    },
    {
      title: "공지사항 제목입니다.2",
      description: "두 번째 공지사항입니다.",
    },
    {
      title: "공지사항 제목입니다.3",
      description: "세 번째 공지사항입니다.",
    },
    {
      title: "공지사항 제목입니다.4",
      description: "네 번째 공지사항입니다.",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleDelete = (index) => {
    const updatedNoticeItems = [...noticeItems];
    updatedNoticeItems.splice(index, 1);
    setNoticeItems(updatedNoticeItems);
    setActiveIndex(null); // 삭제 후 활성화된 인덱스 초기화
  };

  return (
    <div>
      <ul className={`notice-list ${className}`}>
        {noticeItems.map((item, index) => (
          <NoticeItem
            key={index}
            index={index}
            item={item}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notice;
