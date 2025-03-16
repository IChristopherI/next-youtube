'use client'

import AddLikeItem from '@/src/components/addLikeItem';
import CommentForm from '@/src/components/CommentForm';
import CommentList from '@/src/components/CommentList';
import VideoPlayer from '@/src/components/VideoPlayer';
import { User, Video } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function VideoPage() {
  const { id } = useParams();
  const [item, setItem] = useState<(Video & { user: User } | null)>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { data } = await axios.get(`/api/video/${id}`);
        setItem(data);
      } catch (error) {
        console.error("Ошибка загрузки видео", error);
      }
      finally{
        setLoading(false)
      }
    }
    fetchVideo();
  }, [id])
  
    if(loading){
      return <>loading</>;
    }

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
        <div className='flex justify-between mb-2'>
          <div className='flex items-center mt-2'>
            <Image src={item.user?.avatarUrl as string} width={50} height={50} alt='avatar' className='rounded-[50%]' />
            <p className='mx-2'>{item.user?.name}</p>
          </div>
          <div className=' flex items-center'>
            <AddLikeItem videoId={item.id} userId={item.userId as number} />
          </div>
        </div>
        <div className='border rounded p-2'>
          <h1 className='text-xl font-bold'>Описание</h1>
          <p>{item.description}</p>
        </div>
        <CommentForm videoId={item.id} />
        <CommentList videoId={item.id} />
      </div>
    </div>
  );
};
