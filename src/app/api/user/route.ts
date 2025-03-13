import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Не удалось найти токен' }, { status: 400 })
        }

        const user = await prisma.user.findFirst({ where: { token } })

        if (!user) {
            return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 });
        }

        return NextResponse.json(user);
    }
    catch (error) {
        console.log('[GET_USER]', error)
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}