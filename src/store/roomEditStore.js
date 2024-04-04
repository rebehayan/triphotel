import { create } from "zustand";

let roomEditStore = (set, get) => ({
  isEdit: false,
  getIsEdit: () => {
    console.log(get().isEdit);
  },
  changeEdit: (status) => {
    set({ isEdit: status });
  },
});

export const useRoomEditStore = create(roomEditStore);

// roomEditStore = devtools(roomEditStore);
// roomEditStore = persist(roomEditStore, { name: "IsEdit" });
