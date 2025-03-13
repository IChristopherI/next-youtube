
import { prisma } from '@/prisma/prisma-client';
import AddLikeItem from '@/src/components/addLikeItem';
import CommentForm from '@/src/components/CommentForm';
import CommentList from '@/src/components/CommentList';
import VideoPlayer from '@/src/components/VideoPlayer';
import Image from 'next/image';
import React from 'react';

export default async function VideoPage(context: { params: Promise<{ id: string }> }) {
  const id = Number((await context.params).id);

  const item = await prisma.video.update({
    where: { id: id },
    include: {
      user: true,
    },
    data: {
      views: { increment: 1 }
    }
  });

  if (!item) {
    return <>Not found</>;
  }

  return (
    <div className="w-full">
      <VideoPlayer url={item.url} />
      <div className="max-w-[1480px] mx-auto p-4">
        <div className='flex justify-between'>
          <h1 className="text-xl sm:text-2xl font-bold">{item.title}</h1>
          <p>{item.views} Просмотров - {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'No Date'}</p>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center mt-2'>
            <Image src={item.user?.avatarUrl as string} width={50} height={50} alt='avatar' className='rounded-[50%]' />
            <p className='mx-2'>{item.user?.name}</p>
          </div>
            <div className=' flex items-center'>
              <AddLikeItem videoId={item.id} userId={item.userId as number} />
            </div>
        </div>

      </div>
      <CommentForm videoId={item.id} />
      <CommentList videoId={item.id} />
    </div>
  );
};
