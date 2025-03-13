import { prisma } from "@/prisma/prisma-client";
import {NextResponse } from "next/server";

export async function GET() {

    const items = await prisma.video.findMany({
        include: {
          user: true,
        }
      })
    
    if (!items) {
        return NextResponse.json({ message: 'Видео не найдены' })
    }

    return NextResponse.json(items)
}