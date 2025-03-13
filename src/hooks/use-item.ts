"use client";
import React from "react";
import {  useUploadStore } from "../store/uploadStore";

export interface ReturnProps {
    loading: boolean;
    error: boolean;
    removeItem: (id: number) => void;
    updateViewsItem: (id: number) => void;
    fetchLikeItem: (videoId: number, userId: number) => void;
}

export const useItem = (): ReturnProps => {
    const { loading, error, removeItem, updateViewsItem,fetchLikeItem } = useUploadStore();


    return { loading, error, removeItem,updateViewsItem,fetchLikeItem};
};
