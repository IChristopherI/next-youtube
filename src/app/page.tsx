'use client'

import VideoCard from "../components/VideoCard/VideoCard";
import { useEffect, useState } from "react";
import { User, Video } from "@prisma/client";
import axios from "axios";
import { useItem } from "../hooks/use-item";
import { Filter } from "../components/Filter";
import { Skeleton } from "@/ui/skeleton";



export default function Home() {

  const [videos, setVideos] = useState<(Video & { user: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const { categories, fetchCategores } = useItem()
  useEffect(() => {
    async function fetchVideos() {
      try {
        const { data } = await axios.get(`/api/videos`);
        setVideos(data);
      } catch (err) {
        setError("Не удалось загрузить видео");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
    fetchCategores();
  }, []);

  const filteredVideos = (selectedCategory ? videos.filter((videos) => videos.categoryId === selectedCategory) : videos)

  return (
    <div className="flex flex-col">
      <Filter categories={categories} onSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {!loading ? (
          filteredVideos.map((item) => (
            <VideoCard key={item.id}
              id={item.id}
              src={item.url}
              thumbnail={item.thumbnail ?? item.title}
              name={item.user?.name as string}
              avatarUrl={item.user?.avatarUrl ?? 'avatar'}
              title={item.title}
              views={item.views}
              createdAt={item.createdAt}
            />
          ))
        ) : (
         Array.from({length:8}).map((_, index) => (
          <Skeleton key={index} className="w-[410px] h-[230px]" />
         ))
        )}


      </div>
    </div>

  );
}
