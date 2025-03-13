'use client';

import React from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ url }: { url: string }) {
    return (
        <div className="w-full flex justify-center items-center bg-black">
            <div className="w-full max-w-[1280px] aspect-video">
                <ReactPlayer 
                    url={url} 
                    controls 
                    width="100%" 
                    height="100%" 
                    className="object-contain"
                />
            </div>
        </div>
    );
}
