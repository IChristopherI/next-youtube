'use client'

import VideoCard from "../components/VideoCard/VideoCard";
import { useEffect, useState } from "react";
import { User, Video } from "@prisma/client";
import axios from "axios";



export default  function Home() {

  const [videos, setVideos] = useState<(Video & {user: User})[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


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
  }, []);

  return (
    <div className="flex flex-col">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((item) => (
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
        ))}

      </div>
    </div>

  );
}
