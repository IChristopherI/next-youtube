import { create } from "zustand";
import { addLikeItem, deleteItemUser, getCategories, updateViewsUser } from "../services/item";
import { Category } from "@prisma/client";

export interface UploadStore {
  loading: boolean;
  error: boolean;
  fetchLikeItem: (videoId: number, userId: number) => void;
  removeItem: (id: number) => void;
  updateViewsItem: (id: number) => void;


  categories: Category[];
  fetchCategores:() => void
}

export const useUploadStore = create<UploadStore>((set) => ({
  loading: false,
  error: false,
  categories: [],


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


  fetchCategores: async () => {
    try {
      const data = await getCategories();
      set({ categories: data });
    } catch (error) {
      console.error("Ошибка получения категорий:", error);
      set({ error: true });
    }
  },
}));
