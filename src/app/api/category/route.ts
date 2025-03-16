import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    return NextResponse.json(
      { message: "Не удалось загрузить категории" },
      { status: 500 }
    );
  }
}
