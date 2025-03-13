"use client"

import { prisma } from "@/prisma/prisma-client";
import DeleteItem from "@/src/components/deleteItem";
import { Button } from "@/ui/button";
import { Video } from "@prisma/client";
import axios from "axios";
import { VideoOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function VideosPage({ params }: { params: { id: string } }) {
    const id = Number(params.id);
   
    const [items, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchVideos() {
            try {
                const { data } = await axios.get(`/api/videos/${id}`, { withCredentials: true });
                setVideos(data);
            } catch (err) {
                setError("Не удалось загрузить видео");
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p className="text-red-500">{error}</p>;


    return (
        <div className="w-full">
            {items.length > 0 ? (
                <div>
                    <h1 className="font-bold text-3xl">Контент на канале</h1>
                    <table className="w-full border border-collapse border-gray-300 text-left">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="p-1">Видео</th>
                                <th className="p-1">Название</th>
                                <th className="p-1">Дата</th>
                                <th className="p-1">Просмотры</th>
                                <th className="p-1">Редактирование</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-gray-300">
                                    <td className="text-left">
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            width={250}
                                            height={120}
                                            className="max-h-[140px] object-cover p-2 rounded-2xl"
                                        />
                                    </td>
                                    <td className="text-left">{item.title}</td>
                                    <td className="text-left">{item.createdAt ? new Date(item.createdAt).toLocaleString() : "No Date"}</td>
                                    <td className="text-left">{item.views}</td>
                                    <td className="text-left">
                                        <DeleteItem  id={item.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="gap-1 h-screen flex flex-col justify-center items-center">
                    <VideoOff size={100} />
                    <h1 className="text-2xl font-bold">Здесь пусто</h1>
                    <p>Войдите в аккаунт, или опубликуйте видео</p>
                </div>
            )}
        </div>
    );
}
