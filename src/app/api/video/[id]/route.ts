import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        console.log("Обновление просмотров для видео ID:", id);

        if (isNaN(id)) {
            return NextResponse.json({ message: "Некорректный ID видео" }, { status: 400 });
        }

        const videoExists = await prisma.video.findUnique({
            where: { id }
        });

        if (!videoExists) {
            return NextResponse.json({ message: "Видео не найдено" }, { status: 404 });
        }

        const videoUpdate = await prisma.video.update({
            where: { id },
            data: { views: { increment: 1 } },
            include: { user: true }
        });

        return NextResponse.json(videoUpdate);
    } catch (error) {
        console.error("[ERROR_UPDATE_VIEWS]", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}