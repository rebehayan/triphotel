import React, { useState } from "react";
import axios from "axios";
import Input from "../Input";

const NoticeWrite = ({ myId }) => {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const hotelId = parseInt(myId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const boardData = {
      title: title,
      message: description,
    };
    try {
      await axios.post(`http://52.78.12.252:8080/api/hotels/${hotelId}/notices`, boardData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload(); // 공지사항을 추가한 후에 페이지를 새로고침
    } catch (error) {
      console.error("공지사항 추가 실패:", error);
    }
  };

  const handleCancel = () => {
    window.location.reload(); // 취소 버튼을 눌렀을 때 페이지를 새로고침
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
        <button type="button" className="btn-gray" onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
};

export default NoticeWrite;

