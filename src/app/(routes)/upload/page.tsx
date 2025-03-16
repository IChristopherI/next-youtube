"use client";

import { Filter } from "@/src/components/Filter";
import { useItem } from "@/src/hooks/use-item";
import { Input } from "@/ui/input";
import InputFile from "@/ui/inputFile";
import { Skeleton } from "@/ui/skeleton";
import { Textarea } from "@/ui/textarea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState<string>("");


  const { categories, fetchCategores } = useItem();

  useEffect(() => {
    fetchCategores();
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedVideo = e.target.files?.[0];

    if (selectedVideo) {
      setFile(selectedVideo);
      setPreview(URL.createObjectURL(selectedVideo));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      setThumbnail(selectedImage);
      setThumbnailPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !thumbnail || !categoryId) {
      setMessage("Заполните все поля!");
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);
    formData.append("categoryId", categoryId);
    formData.append("description", description);

    try {
      await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Файл успешно опубликован");
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      setMessage("Ошибка загрузки файла");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[90%] md:max-w-6xl mx-auto p-4">
      <h1 className="text-xl text-center font-semibold mb-4">Опубликовать видео</h1>
      <div className="flex flex-col md:flex-row justify-center md:gap-35 gap-4">
        <div>
          <label>Название</label>
          <Input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 h-10 w-full rounded mb-2"
          />
          <Textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col mt-3">
            <label>Загрузите видео</label>
            <InputFile accept="video/*" onChange={handleVideoChange} />
          </div>
          <div className="flex flex-col mt-3">
            <label>Превью</label>
            <InputFile accept=".jpg" onChange={handleImageChange} />
          </div>
        </div>

        {preview ? (
          <video className="mt-4 w-full max-w-[610px] rounded-lg" controls poster={thumbnailPreview ?? preview}>
            <source src={preview} type="video/mp4" />
          </video>
        ) : (
          <Skeleton className="w-full max-w-[610px] h-[200px] rounded-xl md:w-[600px]" />
        )}
      </div>

      {/* Выбор категории */}
      <label className="block mt-3">Добавьте категорию</label>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="" disabled>Выберите категорию</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 hover:cursor-pointer rounded disabled:opacity-50"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Загрузить"}
        </button>
      </div>

      {message && <p className="mt-2 text-red-500 text-center">{message}</p>}
    </div>
  );
};

export default Upload;
