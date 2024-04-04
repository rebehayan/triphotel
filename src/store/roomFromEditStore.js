import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let roomFromEditStore = (set) => ({
  rooms: [],
  addRoom: (roomInfo) =>
    set((state) => ({
      rooms: [...state.rooms, { ...roomInfo, roomId: generateRoomId() }],
    })),
  deleteRoom: (roomId) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room.roomId !== roomId),
    })),
  resetRooms: () => set({ rooms: [] }),
  saveEditedRoom: (newRoomInfo) =>
    set((state) => ({ rooms: [...newRoomInfo] })),
});
const generateRoomId = () => {
  return Math.random().toString(36).substring(7);
};
roomFromEditStore = devtools(roomFromEditStore);
roomFromEditStore = persist(roomFromEditStore, { name: "rooms" });

export const useRoomFromEditStore = create(roomFromEditStore);
