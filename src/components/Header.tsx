import React from 'react';
import { Upload, Home, Search, LogIn, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/ui/button';

const Header: React.FC = () => {
    return (
        <>
            {/* Десктопная версия */}
            <div className="hidden md:flex justify-between items-center px-4 py-3 border-b">
                <Link href={`/`}><h1 className="text-xl font-bold mx-10">Logo</h1></Link>
                <div className="relative w-full max-w-lg">
                    <input type="text" placeholder="Введите запрос" className="w-full pl-10 pr-4 py-2 border rounded-md" />
                </div>
                <div className="flex items-center gap-4">
                    <Link href={`/upload`}><Upload className="w-5 h-5" /></Link>
                   <Button><User /> Войти</Button>
                </div>
            </div>

            {/* Фиксированный мобильный хедер внизу */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-2 md:hidden">
                <Link href={`/`} className="flex flex-col items-center">
                    <Home className="w-7 h-7" />
                    <span className="text-xs">Главная</span>
                </Link>
                <Link href={`/search`} className="flex flex-col items-center">
                    <Search className="w-7 h-7" />
                    <span className="text-xs">Поиск</span>
                </Link>
                <Link href={`/upload`} className="flex flex-col items-center">
                    <Upload className="w-7 h-7" />
                    <span className="text-xs">Загрузить</span>
                </Link>
                <Link href={`/login`} className="flex flex-col items-center">
                    <User className="w-7 h-7" />
                    <span className="text-xs">Войти</span>
                </Link>
            </div>
        </>
    );
};

export default Header;
