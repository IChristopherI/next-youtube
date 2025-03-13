import { LikeType, PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
  await prisma.like.deleteMany({});
  await prisma.comment.deleteMany({});

  await prisma.video.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'test user',
        email: 'test@gmail.com',
        password: hashSync("12345", 10),
        token: '1111',
        avatarUrl: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2017/10/Tsunade-in-black-and-white-in-the-Naruto-manga.jpg'

      },
      {
        id: 2,
        name: 'test admin',
        email: 'testAdmin@gmail.com',
        password: hashSync("12345", 10),
        token: '11111',
        avatarUrl: 'https://i.pinimg.com/736x/3c/8d/df/3c8ddfafcbd2d83de8f9fb74531eb9e4.jpg'
      },
    ]
  })

  await prisma.category.createMany({
    data: [
      { name: "Музыка" },
      { name: "Видеоигры" },
      { name: "Обучение" },
      { name: "Фильмы" },
    ],
  })

  await prisma.video.createMany({
    data: [
      {
        id:1,
        userId: 1,
        title: 'Naruto - Opening 3',
        url: '/uploads/Naruto.mp4',
        thumbnail: '/thumbnail/NarutoPreview.jpg'
      }

    ]
  })

  await prisma.like.createMany({
    data: [
      {
        userId: 1,
        videoId: 1,
        type: "LIKE"
      }
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })