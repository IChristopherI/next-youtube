"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { User } from "@prisma/client";
import { Button } from "@/ui/button";
import { UserRound, UserRoundX } from "lucide-react";

interface UserProps extends User { }

export default function UserProfile({ token }: { token: string }) {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const { data } = await axios.get(`/api/user`);
                setUser(data);
            } catch (error) {
                console.error("Ошибка загрузки пользователя:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [token]);

    if (loading) return <p>Загрузка...</p>;


    return (
        <div className="w-full max-w-[1180px] mx-auto ">
            {user ? (
                <div className="flex border-b">
                    {user.avatarUrl ? (
                        <Image src={user.avatarUrl} width={180} height={180} alt="Аватар" className="rounded-[50%] p-2" />
                    ) : (
                        <div className="w-[120px] h-[120px] bg-gray-300 rounded-full flex items-center justify-center">
                            <span>Нет фото</span>
                        </div>
                    )}
                    <div className="flex flex-col m-2 p-4 ">
                        <h1 className="font-bold text-4xl">{user.name}</h1>
                        <p className="m-1">@{`${user.name}${user.id}`}</p>
                        <div className="flex">
                            <Button className="m-1 rounded-xl">Настроить вид канала</Button>
                            <Button className="m-1 rounded-xl">Управление видео</Button>
                        </div>
                    </div>
                </div>
            ) : (
            <div className="h-screen flex flex-col justify-center items-center">
                <UserRoundX  size={100}/>
                <h1 className="font-bold text-2xl">Пользователь не найден</h1>
            </div>
               )}
               </div>
    );
}
