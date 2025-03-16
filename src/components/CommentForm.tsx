'use client'

import { Button } from '@/ui/button';
import { Textarea } from '@/ui/textarea';
import axios from 'axios';
import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface Props {
    videoId: number;
    className?: string;
}

const CommentForm: React.FC<Props> = ({ videoId, className }) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        try {
            await axios.post(`/api/comment/${videoId}`, { text: value });
            setValue('');
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <h1 className='p-2  font-bold text-2xl'>Комментарии</h1>
            <form onSubmit={handleSubmit}>
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Напишите комментарий..."
                />
                <Button type="submit" disabled={loading || value.trim().length < 3} className={cn('', (loading || value.trim().length < 3) && 'bg-gray-500')}>
                    {loading ? 'Отправка...' : 'Оставить комментарий'}
                </Button>
            </form>
        </div>
    );
};

export default CommentForm;
