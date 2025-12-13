'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import aboutData from '../../data/about.json';
import { motion } from 'framer-motion';
import Timeline from '../../components/Timeline';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#fdfbf7] flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-16">
                            <span className="font-sans text-xs font-bold tracking-[0.2em] text-emerald-800 uppercase mb-4 block">Our Story</span>
                            <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-8">{aboutData.title}</h1>
                            <div className="w-24 h-1 bg-emerald-900 mx-auto opacity-20"></div>
                        </div>

                        {/* Main Story Content */}
                        <div className="prose prose-lg prose-stone font-serif mx-auto leading-loose text-justify mb-24 first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-900 first-letter:mr-3 first-letter:float-left">
                            {aboutData.story.split('\n\n').map((para, i) => (
                                <p key={i} className="mb-6">{para}</p>
                            ))}

                        </div>

                        <Timeline />

                        {/* Author/Founder Section */}
                        <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-stone-100 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-stone-200 overflow-hidden flex-shrink-0 border-4 border-[#fdfbf7] shadow-inner">
                                {/* Placeholder for Author Image - Using a generic refined avatar or initials */}
                                <div className="w-full h-full flex items-center justify-center bg-emerald-900 text-[#f0e6d2] text-4xl font-serif">
                                    {aboutData.author.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">The Founder</div>
                                <h3 className="font-serif text-3xl font-bold text-stone-800 mb-2">{aboutData.author.name}</h3>
                                <p className="font-serif text-stone-500 italic mb-6">{aboutData.author.role}</p>
                                <blockquote className="text-emerald-800 font-medium text-lg border-l-2 border-emerald-900/30 pl-4 italic">
                                    "{aboutData.author.quote}"
                                </blockquote>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
