import React, { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import Input from "../Input";
import axios from "axios";

const NoticeItem = ({ index, myId, item, activeIndex, setActiveIndex, onDelete, ...props }) => {
  const [editedTitle, setEditedTitle] = useState(item.title); // 수정된 제목을 저장할 상태
  const [editedDescription, setEditedDescription] = useState(item.message); // 수정된 내용을 저장할 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부를 나타내는 상태
  const token = localStorage.getItem("token");
  const hotelId = parseInt(myId);
  const noticeId = parseInt(item.id);

  const handleItem = (index) => {
    // 수정 중일 때는 토글이 닫히지 않도록 변경
    if (isEditing && index === activeIndex) return;
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleEdit = () => {
    setIsEditing(true); // 수정 모드로 변경
  };

  const handleSave = async () => {
    const boardData = {
      title: editedTitle,
      message: editedDescription,
    };
    setIsEditing(false);
    try {
      const response = await axios.patch(
        `http://52.78.12.252:8080/api/hotels/${hotelId}/notices/${noticeId}`,
        boardData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("공지사항 추가 실패:", error);
    } finally {
      //onAddNotice({ title, description }); // 부모 컴포넌트로 새로운 공지사항 전달
    }
  };

  const handleCancel = () => {
    // 수정 취소 시 수정 상태를 해제하고 원래 내용으로 롤백
    setIsEditing(false);
    setEditedTitle(item.title); // 수정된 제목 초기화
    setEditedDescription(item.description);
  };

  const handleDelete = () => {
    setIsPopup(true); // 팝업 창 표시
  };

  const handleConfirmDelete = async () => {
    setIsPopup(false); // 팝업 닫기
    try {
      await axios.delete(`http://52.78.12.252:8080/api/hotels/${hotelId}/notices/${noticeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("삭제 완료");
      onDelete(hotelId, noticeId); // 삭제 함수 호출 시 hotelId와 noticeId 모두 전달
      window.location.reload(); // 삭제 후에 페이지를 새로고침
    } catch (error) {
      //console.error("공지사항 삭제 실패:", error);
    }
  };

  const [isPopup, setIsPopup] = useState(false);

  return (
    <li {...props} className="bg-white">
      <button onClick={() => handleItem(index)} className={index === activeIndex ? "active " : ""}>
        {isEditing ? (
          <Input
            type={"text"}
            value={editedTitle}
            onChange={(value) => setEditedTitle(value)}
            style={{ width: "calc(100% - 1rem)" }}
          />
        ) : (
          // 읽기 전용 모드에서는 공지사항 제목을 표시
          item.title
        )}
        {index === activeIndex ? (
          <span>
            <LuMinus />
          </span>
        ) : (
          <span>
            <LuPlus />
          </span>
        )}
      </button>
      {index === activeIndex && (
        <div>
          {isEditing ? (
            // 수정 모드에서는 입력 폼을 렌더링하고, 저장 및 취소 버튼을 표시
            <div>
              <Input
                type={"textarea"}
                value={editedDescription}
                onChange={(value) => setEditedDescription(value)}
                className="!w-full flex"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button className="btn-green-label sm" onClick={handleSave}>
                  저장
                </button>
                <button className="btn-gray-label sm" onClick={handleCancel}>
                  취소
                </button>
              </div>
            </div>
          ) : (
            // 읽기 전용 모드에서는 공지사항 내용을 표시하고, 수정 버튼을 표시
            <div>
              {editedDescription}
              <div className="flex justify-end gap-2">
                <button className="btn-blue-label sm" onClick={handleEdit}>
                  수정
                </button>
                <button className="btn-red-label sm" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* 삭제 확인 팝업 */}
      {isPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-[100]">
          <div className="bg-white p-8 rounded-lg">
            <p>삭제하시겠습니까?</p>
            <div className="flex justify-center gap-2 mt-5">
              <button className="btn-blue" onClick={handleConfirmDelete}>
                확인
              </button>
              <button className="btn-gray" onClick={() => setIsPopup(false)}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default NoticeItem;
