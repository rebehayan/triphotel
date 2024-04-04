import React, { useEffect, useState } from "react";

import instance from "../../api/axios";
import request from "../../api/request";
import Heading from "../Heading";
import MypageCartItem from "./MypageCartItem";

const MypageCart = () => {
  const token = localStorage.getItem("token");
  const { fetchMembersMyCart } = request;
  const [myCart, setMyCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCart = await instance.get(fetchMembersMyCart, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(responseCart);
        setMyCart(responseCart.data.result.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="mypage-cart">
        <div className="bg-white rounded-xl  p-10">
          <Heading tag={"h4"} className={"sm"} text={"장바구니"} />
          <table className="mypage-cart__table mt-5">
            <colgroup>
              <col style={{ width: "5rem" }} />
              <col style={{ width: "" }} />
              <col style={{ width: "10rem" }} />
              <col style={{ width: "10rem" }} />
              <col style={{ width: "10rem" }} />
            </colgroup>
            <thead>
              <tr>
                <th>삭제</th>
                <th>호텔 정보</th>
                <th>방 종류</th>
                <th>가격</th>
                <th>결제</th>
              </tr>
            </thead>
            <tbody>
              {myCart.length > 0 ? (
                myCart.map((items, index) => (
                  <MypageCartItem key={index} items={items} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="!py-10">
                    장바구니가 비어 있습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <div className="bg-white rounded-xl p-10 self-start mt-5">
          <Heading tag={"h4"} className={"sm"} text={"주문 요약"} />
          <div className="cart-price">
            <ul className="grid gap-2">
              <li>
                <span>보유 금액</span>
                <span>
                  1,000,000 <i className="text-sm">원</i>
                </span>
              </li>
              <li className="font-bold">
                <span>총 결재 금액</span>
                <span className="text-lg">
                  1,000,000 <i className="text-sm">원</i>
                </span>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MypageCart;
