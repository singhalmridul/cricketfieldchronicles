'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Library', path: '/library' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-stone-200/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link href="/" className="font-serif text-2xl font-bold text-emerald-900 tracking-tight flex items-center gap-2">
                    <span className="text-3xl">🏏</span>
                    <span>CFC</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} className="relative group">
                                <span className={`font-serif text-sm tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-emerald-800 font-semibold' : 'text-stone-500 hover:text-emerald-700'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-800"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
