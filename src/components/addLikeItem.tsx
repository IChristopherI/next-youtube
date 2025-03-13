"use client";

import { Button } from "@/ui/button";
import { ThumbsUp } from "lucide-react";
import { useItem } from "../hooks/use-item";

interface Props {
    videoId: number;
    userId: number;
}

const AddLikeItem: React.FC<Props> = ({ videoId, userId }) => {
    const { fetchLikeItem } = useItem();

    return (
        <div>
            <Button onClick={() => fetchLikeItem(videoId, userId)}>
                <ThumbsUp />
            </Button>
        </div>
    );
};

export default AddLikeItem;
