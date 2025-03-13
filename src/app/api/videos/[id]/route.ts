import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('cartToken')?.value;
        if (!token) {
            return NextResponse.json({ message: 'Токен не найден' }, { status: 400 })
        }

        const user = await prisma.user.findFirst({ where: { token: token } })

        if (!user) {
            return NextResponse.json({ message: 'Пользователь не найден' }, { status: 400 })
        }

        const video = await prisma.video.findMany({
            where: {
                user: {
                    token: token
                }
            }
        })



        return NextResponse.json(video)

    } catch (error) {

        console.log('[ERROR_GET_USER]', error)
    }

}



export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const token = req.cookies.get("cartToken")?.value;

        const user = await prisma.user.findFirst({
            where: { token: token }
        });

        if (!user) {
            return NextResponse.json({ message: "Пользователь не найден" }, { status: 400 });
        }

        const video = await prisma.video.findFirst({
            where: { id: Number(id) }
        });

        if (!video) {
            return NextResponse.json({ message: "Видео не найдено" }, { status: 404 });
        }

        await prisma.video.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ message: "Видео успешно удалено" }, { status: 200 });

    } catch (error) {
        console.error("Ошибка при удалении видео:", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}
