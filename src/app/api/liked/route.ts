import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
        }

        const user = await prisma.user.findFirst({
            where: { token },
        });

        if (!user) {
            return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 });
        }

        const likedVideos = await prisma.video.findMany({
            where: {
                likes: {
                    some: {
                        userId: user.id,
                        type: "LIKE", 
                    },
                },
            },
            include: {
                user: true, 
                likes: true, 
            },
        });

        return NextResponse.json(likedVideos);
    } catch (error) {
        console.error("[ERROR_GET_LIKED_VIDEOS]", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const { videoId, userId } = await req.json();

        if (!videoId || !userId) {
            return NextResponse.json({ message: "ID видео или пользователя отсутствует" }, { status: 400 });
        }

        // Проверяем, лайкал ли уже пользователь это видео
        const existingLike = await prisma.like.findFirst({
            where: { videoId, userId },
        });

        if (existingLike) {
            return NextResponse.json({ message: "Видео уже в понравившихся" }, { status: 400 });
        }

        // Добавляем лайк в БД
        const likedVideo = await prisma.like.create({
            data: {
                videoId,
                userId,
                type:"LIKE"
            },
        });

        return NextResponse.json({ message: "Видео добавлено в понравившиеся", likedVideo });
    } catch (error) {
        console.error("Ошибка сервера:", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}