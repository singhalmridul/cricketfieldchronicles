'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#fdfbf7] p-6">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center grayscale-[20%]" style={{ backgroundImage: 'url("https://static.wixstatic.com/media/b4de10_aac7981e01b04e63888f39c1e7ac8493%7Emv2.png/v1/fit/w_2500,h_1330,al_c/b4de10_aac7981e01b04e63888f39c1e7ac8493%7Emv2.png")' }}></div>
            <div className="absolute inset-0 bg-stone-50/80 backdrop-blur-[2px]"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                <div className="text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-sans text-xs md:text-sm font-bold tracking-[0.3em] text-emerald-800 uppercase mb-6 block lg:inline-block">
                            Preserving the Spirit of the Game
                        </span>
                        <h1 className="font-serif text-4xl md:text-6xl min-[1400px]:text-8xl font-bold text-stone-900 mb-8 leading-tight">
                            Cricket Field <br /> <span className="italic text-emerald-900">Chronicles</span>
                        </h1>
                        <p className="font-serif text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Unearthing forgotten gems, celebrating historical triumphs, and exploring the finest literature from the world of cricket.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start items-center">
                            <Link href="/library" className="group relative inline-flex items-center justify-center px-8 py-3 bg-emerald-900 text-[#f0e6d2] font-serif overflow-hidden rounded-full transition-all hover:bg-emerald-800 hover:scale-105 shadow-lg">
                                <span className="relative z-10 flex items-center gap-2">
                                    Enter Library <span>→</span>
                                </span>
                            </Link>
                            <Link href="/about" className="px-8 py-3 text-emerald-900 font-serif font-medium hover:underline decoration-emerald-900/30 underline-offset-4">
                                Our Story
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Featured Story Spotlight */}
                <div className="hidden lg:flex justify-center perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, x: 20, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: -5 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="relative w-[300px] h-[450px] bg-stone-100 rounded shadow-2xl overflow-hidden group hover:rotate-0 transition-transform duration-500 ease-out cursor-pointer border-[8px] border-stone-800/50"
                    >
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://static.wixstatic.com/media/b4de10_e3dd86c9cbc24874bcaab60891f96dc3~mv2.jpeg/v1/fill/w_500,h_769,al_c,q_85/b4de10_e3dd86c9cbc24874bcaab60891f96dc3~mv2.jpeg")' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
                            <span className="inline-block px-2 py-1 bg-amber-600 text-[10px] tracking-widest uppercase font-bold mb-2 rounded-sm">Featured Story</span>
                            <h3 className="font-serif text-2xl font-bold leading-tight mb-2 drop-shadow-md">Spin, Struggle and Triumph</h3>
                            <p className="text-xs opacity-80 mb-4 line-clamp-2">The Story of Palwankar Baloo - India's first great cricketer who broke social barriers.</p>
                            <Link href="/library" className="text-xs font-bold uppercase tracking-wider border-b border-white/50 hover:border-white transition-colors pb-1">Read Now</Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Simple Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-emerald-900/40"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                ↓
            </motion.div>
        </section>
    );
};

export default Hero;
