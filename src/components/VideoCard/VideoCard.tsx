'use client'
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type User = {
    avatarUrl: string;
    name: string;

}

interface Props extends User {
    id: number;
    title: string;
    src: string;
    thumbnail: string;
    views: number;
    createdAt: Date;
    className?: string;
}

const VideoCard: React.FC<Props> = ({ title, src, thumbnail, views, createdAt, name, avatarUrl, id }) => {
    const time = new Date(createdAt);
    const formatedData = time.toLocaleTimeString();
    return (
        <div className={cn('p-3')}>
            <Link href={`/video/${id}`} key={id}>
                <video className="w-[410px] h-[230px] object-cover rounded-lg shadow-xl" poster={thumbnail}>
                    <source src={src} type="video/mp4"></source>
                </video>
                <div className='flex gap-3 p-2'>
                    <div>
                        <Image src={avatarUrl} width={40} height={50} alt='avatar' className='rounded-[50%] h-[40px] object-center' />
                    </div>
                    <div className='flex flex-col text-sm'>
                        <h1 className='font-bold text-xl mb-2'>{title}</h1>
                        <p className=''>{name}</p>
                        <div className='flex gap-2'>
                            <p>{views} просмотров</p>
                            <p>{formatedData}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default VideoCard;