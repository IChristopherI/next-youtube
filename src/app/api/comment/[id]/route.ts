import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { params } = context;

        if (!params || !params.id) {
            return NextResponse.json({ message: "ID не передан" }, { status: 400 });
        }

        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ message: "Неверный ID" }, { status: 400 });
        }

        const video = await prisma.video.findUnique({
            where: { id }
        });

        if (!video) {
            return NextResponse.json({ message: "Видео не найдено" }, { status: 404 });
        }

        const comments = await prisma.comment.findMany({
            where: { videoId: id }, 
            include: { user: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error("[ERROR_GET_COMMENTS]", error);
        return NextResponse.json({ message: "Ошибка сервера", error: String(error) }, { status: 500 });
    }
}



export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const videoId = Number(params.id);
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ message: "Токен отсутствует" }, { status: 401 });
        }

        const user = await prisma.user.findFirst({
            where: { token }
        });

        if (!user) {
            return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 });
        }

        const video = await prisma.video.findFirst({
            where: { id: videoId }
        });

        if (!video) {
            return NextResponse.json({ message: "Видео не найдено" }, { status: 404 });
        }

        const body = await req.json();
        const { text } = body;


        const newComment = await prisma.comment.create({
            data: {
                text,
                userId: user.id,
                videoId
            },
            include: {
                user: true
            }
        });

        return NextResponse.json(newComment);
    } catch (error) {
        console.error('[ERROR_POST_COMMENT]', error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}
