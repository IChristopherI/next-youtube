import { create } from "zustand";
import { addLikeItem, deleteItemUser, updateViewsUser } from "../services/item";

export interface UploadStore {
  loading: boolean;
  error: boolean;
  fetchLikeItem: (videoId: number, userId: number) => void;
  removeItem: (id: number) => void;
  updateViewsItem: (id: number) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  loading: false,
  error: false,

  fetchLikeItem: async (videoId: number, userId: number) => {
    try {
      set({ loading: true, error: false });
      await addLikeItem(videoId, userId);
    } catch (error) {
      console.error("Ошибка лайка:", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      await deleteItemUser(id);
    } catch (error) {
      console.error("Ошибка удаления:", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateViewsItem: async (id: number) => {
    try {
      await updateViewsUser(id);
    } catch (error) {
      console.error("Ошибка обновления просмотров:", error);
      set({ error: true });
    }
  },
}));
