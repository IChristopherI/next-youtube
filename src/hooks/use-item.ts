"use client";
import React from "react";
import { useUploadStore } from "../store/uploadStore";
import { Category } from "@prisma/client";

export interface ReturnProps {
    loading: boolean;
    error: boolean;
    removeItem: (id: number) => void;
    updateViewsItem: (id: number) => void;
    fetchLikeItem: (videoId: number, userId: number) => void;
    categories: Category[];
    fetchCategores: () => void;
}

export const useItem = (): ReturnProps => {
    const { loading, error, removeItem, updateViewsItem, fetchLikeItem, fetchCategores, categories } = useUploadStore();


    return { loading, error, removeItem, updateViewsItem, fetchLikeItem, fetchCategores, categories };
};
