import React, { useState } from "react";
import axios from "axios";
import Input from "../Input";
import { useReservationStore } from "../../store/reservationStore";

const NoticeWrite = ({ myId, onAddNotice }) => {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const hotelId = parseInt(myId);
  const boardData = {
    title: title,
    message: description,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://52.78.12.252:8080/api/hotels/${hotelId}/notices`,
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
      setTitle(""); // 입력값 초기화
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="notice-write">
      <div>
        제목
        <Input type="text" value={title} onChange={(value) => setTitle(value)} />
      </div>
      <div>
        내용
        <Input type="textarea" value={description} onChange={(value) => setDescription(value)} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button type="submit" className="btn-blue">
          작성
        </button>
        <button type="button" className="btn-gray" onClick={() => {}}>
          취소
        </button>
      </div>
    </form>
  );
};

export default NoticeWrite;
