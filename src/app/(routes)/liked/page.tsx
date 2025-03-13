"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Video {
    id: number;
    title: string;
    url: string;
    thumbnail: string;
    views: number;
    user: {
        name: string;
        avatarUrl: string;
    };
}

export default function LikedVideosPage() {
    const [likedVideos, setLikedVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLikedVideos() {
            try {
                const { data } = await axios.get("/api/liked", { withCredentials: true });
                setLikedVideos(data);
            } catch (err) {
                setError("Не удалось загрузить понравившиеся видео");
            } finally {
                setLoading(false);
            }
        }

        fetchLikedVideos();
    }, []);

    if (loading) return <p className="text-center text-xl text-gray-300">Загрузка...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-[1280px] mx-auto p-4 text-white">
            <h1 className="text-2xl font-bold mb-4 text-center">Понравившиеся видео</h1>

            {likedVideos.length === 0 ? (
                <p className="text-gray-500 text-center">Вы еще не добавили видео в "Понравившиеся"</p>
            ) : (
                <div className="space-y-4">
                    {likedVideos.map((video) => (
                        <Link href={`/video/${video.id}`} key={video.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition">
                            <div>
                            <p>{video.id}</p>
                            </div>
                            <div className="relative w-[300px] h-[130px]">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    layout="fill"
                                    className="rounded-lg object-cover "
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold line-clamp-2">{video.title}</h2>
                                <div className="flex gap-2">
                                <p className="text-sm text-gray-400">{video.user.name}</p>
                                <p className="text-sm text-gray-400">{video.views} просмотров</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
