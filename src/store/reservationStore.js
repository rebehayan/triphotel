import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let reservationStore = (set) => ({
  paymentInfos: {},
  totalInfos: [],
  noticeId: "",
  allCountStore: 0,

  // 결제정보
  addInfo: (paymentState) =>
    set((state) => ({
      paymentInfos: [paymentState],
    })),

  // 결제정보 + 호텔정보
  addAdditionalInfo: (additionalText) =>
    set((state) => ({
      totalInfos: [...state.totalInfos, additionalText],
    })),

  // 호텔공지사항 아이디
  addNotice: (id) =>
    set((state) => ({
      noticeId: id,
    })),

  // 예약총인원수
  addCount: (num) =>
    set((state) => ({
      allCountStore: num,
    })),
});

reservationStore = devtools(reservationStore);
reservationStore = persist(reservationStore, { name: "reservation" });

export const useReservationStore = create(reservationStore);
