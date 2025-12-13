'use client';

import React from 'react';
import { motion } from 'framer-motion';

const events = [
    { year: '1875', title: 'The Pioneer Born', desc: 'Palwankar Baloo, India’s first great cricketer, is born. He would go on to break caste barriers through his spin bowling.', color: 'bg-emerald-900' },
    { year: '1896', title: 'Valentine’s Day Miracle', desc: 'George Lohmann destroys South Africa with 9-28, including a hat-trick, on Valentine’s Day.', color: 'bg-rose-900' },
    { year: '1932', title: 'Test Debut', desc: 'India plays its first ever Test match at Lord’s, marking the beginning of a new era.', color: 'bg-blue-900' },
    { year: '1952', title: 'First Victory', desc: 'Vinoo Mankad inspires India to their maiden Test win against England in Madras.', color: 'bg-indigo-900' },
    { year: '1976', title: 'The Revolt', desc: 'Bishan Singh Bedi declares an innings in protest against West Indies’ intimidating bowling.', color: 'bg-cyan-900' },
    { year: '1983', title: 'World Champions', desc: 'Kapil’s Devils stun the world by defeating West Indies to lift the World Cup.', color: 'bg-amber-800' },
    { year: '1996', title: 'Cola Wars', desc: 'The heated clash between Pepsi and Coca-Cola defines the marketing of the Wills World Cup.', color: 'bg-sky-900' },
    { year: '2021', title: 'Gabba Breached', desc: 'A young Indian side defeats Australia at the Gabba, ending their 32-year unbeaten streak.', color: 'bg-purple-900' }
];

const TimelineCard = ({ evt, align = 'left' }: { evt: any, align?: 'left' | 'right' }) => (
    <div className={`p-6 bg-white rounded shadow-lg border-t-4 ${evt.color.replace('bg-', 'border-')} relative hover:-translate-y-1 transition-transform duration-300`}>
        <span className={`absolute top-4 ${align === 'left' ? 'right-4' : 'left-4'} text-4xl font-bold opacity-10 font-serif`}>{evt.year}</span>
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">{evt.title}</h3>
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">{evt.year}</div>
        <p className="font-serif text-stone-600 text-sm leading-relaxed">{evt.desc}</p>
    </div>
);

const Timeline = () => {
    return (
        <div className="py-24 relative overflow-hidden">

            <h2 className="text-center font-serif text-3xl font-bold text-stone-800 mb-20 relative z-10">
                <span className="bg-[#fdfbf7] px-4 relative z-10">Timeline of Glory</span>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-stone-300 -z-0"></div>
            </h2>

            {/* Center Line (Desktop) */}
            <div className="absolute left-1/2 top-40 bottom-10 w-0.5 bg-stone-300 -translate-x-1/2 hidden md:block"></div>

            {/* Desktop View (Split) */}
            <div className="space-y-12 relative container mx-auto px-6 max-w-5xl hidden md:block">
                {events.map((evt, i) => (
                    <div key={i} className="flex flex-row items-center justify-between w-full relative z-10">
                        {/* Left Side */}
                        <div className="w-5/12">
                            {i % 2 === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <TimelineCard evt={evt} align="left" />
                                </motion.div>
                            ) : <div></div>}
                        </div>

                        {/* Center Dot */}
                        <div className={`w-6 h-6 rounded-full border-4 border-[#fdfbf7] shadow-md ${evt.color} flex-shrink-0 relative z-20`}></div>

                        {/* Right Side */}
                        <div className="w-5/12">
                            {i % 2 !== 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <TimelineCard evt={evt} align="right" />
                                </motion.div>
                            ) : <div></div>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile View (Vertical Left) */}
            <div className="md:hidden container mx-auto px-6 relative">
                {/* Mobile Line */}
                <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-stone-300"></div>

                <div className="space-y-8">
                    {events.map((evt, i) => (
                        <div key={i} className="relative pl-12">
                            {/* Dot on line */}
                            <div className={`absolute left-2 top-6 w-5 h-5 rounded-full border-4 border-[#fdfbf7] shadow-md ${evt.color} z-10`}></div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5 }}
                            >
                                <TimelineCard evt={evt} align="left" />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
