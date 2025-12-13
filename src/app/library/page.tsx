'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LibraryShelf from '../../components/LibraryShelf';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import for the Book component to avoid SSR issues with react-pageflip
const Book = dynamic(() => import('../../components/Book'), { ssr: false });

export default function LibraryPage() {
    const [selectedBlog, setSelectedBlog] = useState<any>(null);

    const handleOpenBook = (blog: any) => {
        setSelectedBlog(blog);
    };

    const handleCloseBook = () => {
        setSelectedBlog(null);
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7] flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-6 mb-12 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">The Library</h1>
                    <p className="font-serif text-stone-600 max-w-2xl mx-auto italic">
                        Select a volume to begin reading.
                    </p>
                </div>

                <LibraryShelf onBookClick={handleOpenBook} />
            </main>

            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100] bg-stone-900/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
                    >
                        {/* Reading Room Environment */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-20 pointer-events-none"></div>

                        <Book blog={selectedBlog} onClose={handleCloseBook} />

                        <div className="mt-8 text-stone-500 font-serif text-sm opacity-60">
                            Use mouse/touch to flip pages
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
