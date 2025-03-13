'use client'

import React from 'react';
import SideBar from './SideBar';

interface Props {
    className?: string;
}

const SideBarWrapper: React.FC<Props> = ({ className }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <SideBar isOpen={isSidebarOpen} toggleSideBar={() => setIsSidebarOpen(!isSidebarOpen)} />
    );
};

export default SideBarWrapper;