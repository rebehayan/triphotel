import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import "../styles/components/guestcounter.css";
import Toast from "./Toast";
import { useReservationStore } from "../store/reservationStore";

const GuestCounterChild = ({ iscount, max, defaultValue, kids, className, allCount }) => {
  const [count, setCount] = useState(defaultValue || 0);
  const [toast, setToast] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { allCountStore } = useReservationStore;

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
      iscount(count - 1);
    } else {
      setToast(true);
    }
    // console.log(max, count - 1);
    if (max > count - 1) {
      setIsDisabled(false);
    }
  };
  const handleIncrease = () => {
    setCount(count + 1);
    iscount(count + 1);
    if (max < count + 1) {
      setIsDisabled(true);
      setCount(count);
    }
  };
  const handleChange = (e) => {
    let value = e.target.value;
    setCount(value);
    iscount(value);
  };
  // if (allCountStore === max) {
  //   setIsDisabled(true);
  // } else if (allCountStore < max) {
  //   setIsDisabled(false);
  // }
  // console.log(allCountStore);
  return (
    <>
      <div className={`guest-counter ${className}`}>
        <button onClick={handleDecrease} disabled={isDisabled}>
          <TbMinus />
        </button>
        <input type="number" min={kids ? "0" : "1"} className="input" value={count} readOnly onChange={handleChange} />
        <button onClick={handleIncrease} disabled={isDisabled}>
          <TbPlus />
        </button>
      </div>
      {!kids && (
        <Toast onOpen={toast} onClose={() => setToast(false)} color={"red"}>
          최소 1명이상 선택해야 합니다.
        </Toast>
      )}
    </>
  );
};

export default GuestCounterChild;
