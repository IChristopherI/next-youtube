"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Comment {
    id: number;
    text: string;
    user: {
        name: string;
        avatarUrl: string;
    };
}

interface Props {
    videoId: number;
    className?: string;
}

const CommentList: React.FC<Props> = ({ videoId, className }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await axios.get(`/api/comment/${videoId}`);
                setComments(response.data);
            } catch (error) {
                setError("Ошибка при загрузке комментариев");
                console.error("Ошибка загрузки:", error);
            } finally {
                setLoading(false);
            }
        };

        getComments();
    }, [videoId]);

    if (loading) return <p>Загрузка комментариев...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={className}>
            {comments.length === 0 ? (
                <p>Комментариев пока нет</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className=" flex py-2 gap-2">
                        <div>
                            <Image width={50} height={40} src={comment.user.avatarUrl} alt="UserAvatar" className="rounded-[50%] object-fill h-[40px]" />

                        </div>
                        <div>
                            <strong>{comment.user.name}</strong>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentList;
