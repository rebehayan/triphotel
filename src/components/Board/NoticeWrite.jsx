import React, { useState } from "react";
import axios from "axios";
import Input from "../Input";

const NoticeWrite = ({ hotelId, onAddNotice }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://52.78.12.252:8080/api/hotels/${hotelId}/notices`,
        {
          title,
          description,
        }
      );
      console.log("공지사항 추가 성공:", response.data);
      onAddNotice({ title, description }); // 부모 컴포넌트로 새로운 공지사항 전달
      setTitle(""); // 입력값 초기화
      setDescription("");
    } catch (error) {
      console.error("공지사항 추가 실패:", error);
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
      <div className="flex justify-center gap-2 mt-6">
        <button type="submit" className="btn-blue">작성</button>
        <button type="button" className="btn-gray" onClick={() => {}}>취소</button>
      </div>
    </form>
  );
};

export default NoticeWrite;
