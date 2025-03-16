"use client";

import { Button } from "@/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useItem } from "../hooks/use-item";
import toast from "react-hot-toast";

interface Props {
    videoId: number;
    userId: number;
}

const AddLikeItem: React.FC<Props> = ({ videoId, userId }) => {
    const { fetchLikeItem } = useItem();

    const addItem = async() => {
        try {
             await fetchLikeItem(videoId, userId);
            toast.success('Видео успешно добавлено в понравившиеся')
        } catch (error) {
            console.log('ERROR_ADD_LIKEITEM', error)
            toast.error('Не удалось добавить видео в понравившиеся')
        }

    }

    return (
        <div>
            <Button onClick={addItem}>
                <ThumbsUp />
            </Button>
        </div>
    );
};

export default AddLikeItem;
