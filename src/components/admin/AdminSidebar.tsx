'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, LogOut, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Content Manager', path: '/admin/content', icon: BookOpen },
        { name: 'User Insights', path: '/admin/users', icon: Users },
        // { name: 'Reports', path: '/admin/reports', icon: FileText },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-stone-200 z-50 hidden md:flex flex-col">
            <div className="h-20 flex items-center px-8 border-b border-stone-100">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl">🏏</span>
                    <div className="flex flex-col">
                        <span className="font-serif font-bold text-emerald-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">CFC</span>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold leading-none">Admin</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 py-8 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link key={item.path} href={item.path} className="block relative">
                            {isActive && (
                                <motion.div
                                    layoutId="activeAdminNav"
                                    className="absolute inset-0 bg-emerald-50 rounded-lg"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'text-emerald-900 font-medium' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'}`}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="font-sans text-sm">{item.name}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-stone-100">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className="font-sans text-sm font-medium">Exit Admin</span>
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
