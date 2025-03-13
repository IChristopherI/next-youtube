import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function PATCH( { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        console.log("Обновление просмотров для видео ID:", id);

        if (!id) {
            return NextResponse.json({ message: "ID видео не найдено" }, { status: 400 });
        }

        // Проверяем, существует ли видео
        const videoExists = await prisma.video.findFirst({
            where: { id: id }
        });

        if (!videoExists) {
            return NextResponse.json({ message: "Видео не найдено" }, { status: 404 });
        }

        const videoUpdate = await prisma.video.update({
            where: { id: id },
            data: { views: { increment: 1 } },
            include: { user: true }
        });

        return NextResponse.json(videoUpdate);
    } catch (error) {
        console.error("[ERROR_UPDATE_VIEWS]", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}