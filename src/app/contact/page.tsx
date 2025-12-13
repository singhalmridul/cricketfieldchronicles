'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

export default function ContactPage() {
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
                            <span className="font-sans text-xs font-bold tracking-[0.2em] text-emerald-800 uppercase mb-4 block">Get in Touch</span>
                            <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-8">Contact Us</h1>
                            <div className="w-24 h-1 bg-emerald-900 mx-auto opacity-20"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <div>
                                <h3 className="font-serif text-2xl font-bold text-stone-800 mb-6">We'd love to hear from you.</h3>
                                <p className="font-serif text-stone-600 mb-8 leading-relaxed">
                                    Whether you have a story designed for the archives, a suggestion for a book review, or just want to talk cricket – our inbox is always open.
                                </p>

                                <div className="space-y-6 font-serif">
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-1">Email</div>
                                        <div className="text-stone-700">contact@cricketfieldchronicles.com</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-1">Social</div>
                                        <div className="flex gap-4 text-stone-700">
                                            <a href="#" className="hover:text-emerald-800 underline">Twitter</a>
                                            <a href="#" className="hover:text-emerald-800 underline">Instagram</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form className="bg-white p-8 rounded-sm shadow-xl border border-stone-100">
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">Name</label>
                                    <input type="text" className="w-full bg-[#fdfbf7] border border-stone-200 p-3 outline-none focus:border-emerald-500 transition-colors font-serif" placeholder="Your Name" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">Email</label>
                                    <input type="email" className="w-full bg-[#fdfbf7] border border-stone-200 p-3 outline-none focus:border-emerald-500 transition-colors font-serif" placeholder="Your Email" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-800 mb-2">Message</label>
                                    <textarea rows={4} className="w-full bg-[#fdfbf7] border border-stone-200 p-3 outline-none focus:border-emerald-500 transition-colors font-serif" placeholder="Tell us your story..."></textarea>
                                </div>
                                <button type="button" className="w-full bg-emerald-900 text-[#f0e6d2] py-3 font-serif font-bold uppercase tracking-widest hover:bg-emerald-800 transition-colors">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
