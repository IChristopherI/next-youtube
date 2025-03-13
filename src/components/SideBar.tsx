import React from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { History, HomeIcon, Menu, ThumbsUp, User, Video } from "lucide-react";

interface Props {
  id?:number;
  isOpen: boolean;
  toggleSideBar?: () => void;
}

const SideBar: React.FC<Props> = ({id, isOpen, toggleSideBar }) => {
  return (
    <>

      <Menu
        onClick={toggleSideBar}
        size={30}
        className="hidden lg:block absolute top-4 left-5 hover:cursor-pointer"
        />
      <aside
        className={cn(
          "hidden lg:block lg:h-screen bg-gray-50 p-3 transition-all duration-200", 
          isOpen ? "w-54" : "w-18"
        )}
      >
        <div className="mt-4">
          <Link href="/" className="flex items-center gap-4 p-2 hover:bg-gray-300 rounded-md transition">
            <HomeIcon size={27} />
            {isOpen && <p>Главная</p>}
          </Link>

          <Link href="/user" className="flex items-center gap-4 p-2 hover:bg-gray-300 rounded-md transition">
            <User size={27} />
            {isOpen && <p>Вы</p>}
          </Link>

          <Link href="/history" className="flex items-center gap-4 p-2 hover:bg-gray-300 rounded-md transition">
            <History size={27} />
            {isOpen && <p>История</p>}
          </Link>

          <Link href="/liked" className="flex items-center gap-4 p-2 hover:bg-gray-300 rounded-md transition">
            <ThumbsUp size={27} />
            {isOpen && <p>Понравившиеся</p>}
          </Link>

          <Link href={`/myVideos/${id}`} className="flex items-center gap-4 p-2 hover:bg-gray-300 rounded-md transition">
            <Video size={27} />
            {isOpen && <p>Ваши видео</p>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
