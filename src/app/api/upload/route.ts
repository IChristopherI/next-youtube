import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { prisma } from "@/prisma/prisma-client";


// Отключаем встроенный bodyParser, так как работаем с файлами
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File || null;
    const title = formData.get('title') as string || null;
    const thumbnail = formData.get('thumbnail') as File || null



    if (!file || !title || !thumbnail) {
      return NextResponse.json({ message: 'Заполните все данные' }, { status: 400 });
    }

    let token = req.cookies.get('cartToken')?.value;
    if (!token) {
      return NextResponse.json({message:'Не удалось опубликовать видео, войдите или зарегестрируйте аккаунт'}, {status:400})
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { token }
        ]
      }
    })



    // if (!user) {
    //   user = await prisma.user.create({
    //     data: {
    //       token,
    //       name: "Anonymous",
    //       email: `user_${token}@example.com`,
    //       password: "defaultpassword123", 
    //     },
    //   });
    // }

    //Генерируем имя файла, 2 рядок путь
    const fileName = `${randomUUID()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName)


    //Также только  с превью
    const fileThumbnailName = `${randomUUID()} - ${thumbnail.name}`;
    const fileThumbnailPath = path.join(process.cwd(), 'public/thumbnail', fileThumbnailName)


    //Записываем файл в папку, также с превью
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const buffer1 = Buffer.from(await thumbnail.arrayBuffer());
    await writeFile(fileThumbnailPath, buffer1);


    const video = await prisma.video.create({
      data: {
        title,
        url: `/uploads/${fileName}`,
        thumbnail: `/thumbnail/${fileThumbnailName}`,
        userId: user?.id,
      }
    })

    const responce = NextResponse.json({ message: "Видео успешно загружено", video, });
    responce.cookies.set('cartToken', token)
    return responce;

  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
