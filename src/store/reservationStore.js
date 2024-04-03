import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

let reservationStore = (set) => ({
  paymentInfos: {},
  totalInfos: [],
  noticeId: '',

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

  // 결재할 장바구니 아이디
  addNotice: (id) =>
    set((state) => ({
      noticeId: id,
    })),
});

reservationStore = devtools(reservationStore);
reservationStore = persist(reservationStore, { name: "reservation" });

export const useReservationStore = create(reservationStore);
