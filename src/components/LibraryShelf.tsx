'use client';

import React from 'react';
import blogs from '../data/blogs.json';
import { motion } from 'framer-motion';

interface LibraryShelfProps {
    onBookClick: (blog: any) => void;
}

const LibraryShelf: React.FC<LibraryShelfProps> = ({ onBookClick }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("All");

    const categories = React.useMemo(() => {
        const cats = new Set(blogs.map(b => b.category));
        return ["All", ...Array.from(cats)];
    }, []);

    const filteredBlogs = React.useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12">
            {/* Search and Filters */}
            <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search library..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#fdfbf7] border-2 border-[#3d2b1f] rounded-full px-6 py-3 pl-12 font-serif focus:outline-none focus:ring-2 focus:ring-emerald-800 text-stone-800 placeholder:text-stone-400 shadow-sm"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex gap-2 flex-wrap justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-serif transition-all ${selectedCategory === cat
                                ? 'bg-emerald-900 text-[#f0e6d2] shadow-md scale-105'
                                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookshelf Container */}
            <div className="bg-[#4a3728] p-8 md:p-12 rounded-lg shadow-2xl border-4 border-[#3d2b1f] relative overflow-hidden min-h-[400px]">
                {/* Wood Texture Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }}></div>

                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-8 gap-y-20 relative z-10">
                        {filteredBlogs.map((blog, index) => (
                            <div key={blog.id} className="relative group perspective-1000 flex flex-col items-center">
                                <motion.div
                                    className="w-full cursor-pointer relative"
                                    whileHover={{ scale: 1.05, rotateY: -10, z: 20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    onClick={() => onBookClick(blog)}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Book Spine / Cover Representation on Shelf */}
                                    <div className={`relative aspect-[2/3] rounded-r-md shadow-lg ${blog.coverColor || 'bg-emerald-900'} transition-shadow duration-300 group-hover:shadow-2xl overflow-hidden border-l-4 border-white/5`}>
                                        {/* Texture on Cover */}
                                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>

                                        {/* Decorative Spine */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-3 md:w-5 ${blog.spineColor || 'bg-emerald-950'} border-r border-white/10 shadow-inner`}></div>

                                        {/* Cover Content */}
                                        <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-500`} style={{ backgroundImage: blog.coverImage ? `url(${blog.coverImage})` : undefined }}>
                                            {/* Overlay gradient for readability if extraction fails, but generally we want the image to pop */}
                                            <div className={`absolute inset-0 ${blog.coverImage ? 'bg-black/30' : ''} transition-opacity duration-300 group-hover:opacity-10`} />
                                        </div>

                                        {/* Fallback Text if Image Fails or is Loading (or just on top for style) */}
                                        <div className={`absolute inset-0 p-3 flex flex-col justify-between ${blog.textColor || 'text-stone-100'} z-10`}>
                                            <div className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-80 border-b border-current pb-1 truncate drop-shadow-md">
                                                {blog.category}
                                            </div>
                                            {/* Hide title if we have an image, or styling preference? Let's keep it but make it subtle text-shadow for readability */}
                                            <h3 className="font-serif font-bold text-sm md:text-lg leading-tight line-clamp-4 drop-shadow-md bg-black/20 p-1 rounded backdrop-blur-[1px]">
                                                {blog.title}
                                            </h3>
                                            <div className="mt-2 text-[10px] md:text-xs opacity-90 italic truncate drop-shadow-md">
                                                {blog.author}
                                            </div>
                                        </div>

                                        {/* Pages visual effect on the side */}
                                        <div className="absolute right-0 top-1 bottom-1 w-1.5 bg-[#fdfbf7] rounded-r-sm opacity-90 shadow-inner transform translate-x-[1px] bg-[linear-gradient(to_right,#e3dccb_1px,transparent_1px)] bg-[size:2px_100%]"></div>
                                    </div>
                                </motion.div>

                                {/* Shelf Shadow for each book */}
                                <div className="w-[90%] h-3 bg-black/40 blur-sm rounded-full mt-2 group-hover:scale-90 transition-transform duration-300"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-[#f0e6d2]/60 z-10 relative">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 19.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 19.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="font-serif text-xl italic">No stories found. Try a different search.</p>
                    </div>
                )}

                {/* Shelf Dividers (Horizontal Rows) - Visual only, assuming roughly 5 items per row */}
                {/* This is hard to align perfectly with grid, so we stick to a container look or add row dividers using CSS grid tricks if needed. 
                     For now, the background gives the heavy wood feel. */}
            </div>
        </div>
    );
};

export default LibraryShelf;
