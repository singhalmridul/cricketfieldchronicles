'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Library, Info, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Library', path: '/library', icon: Library },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: Mail },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-stone-200 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="flex flex-col items-center justify-center p-2 w-full relative group"
                        >
                            <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-100 text-emerald-900' : 'text-stone-400 hover:text-stone-600'}`}>
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[10px] font-medium mt-1 transition-colors ${isActive ? 'text-emerald-900' : 'text-stone-400'}`}>
                                {item.name}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavActive"
                                    className="absolute -top-[1px] left-1/4 right-1/4 h-[2px] bg-emerald-600 rounded-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
