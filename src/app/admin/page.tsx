'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Clock, Activity, ArrowRight } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import TrafficChart from '../../components/admin/TrafficChart';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div>
                <h1 className="font-serif text-3xl font-bold text-stone-900">Dashboard</h1>
                <p className="text-stone-500 mt-1">Welcome back. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Visitors"
                    value="12,345"
                    icon={Users}
                    trend="12% vs last week"
                    trendUp={true}
                />
                <StatCard
                    title="Active Readers"
                    value="1,203"
                    icon={BookOpen}
                    trend="5% vs last week"
                    trendUp={true}
                />
                <StatCard
                    title="Avg. Read Time"
                    value="4m 32s"
                    icon={Clock}
                    trend="2% vs last week"
                    trendUp={false}
                />
                <StatCard
                    title="Bounce Rate"
                    value="42.5%"
                    icon={Activity}
                    description="Consistent performance"
                />
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <TrafficChart />
                </div>

                {/* Recent Activity / Quick Actions */}
                <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="bg-emerald-900 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <BookOpen size={100} />
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-2 relative z-10">Add New Story</h3>
                        <p className="text-emerald-100/80 text-sm mb-6 relative z-10 max-w-[200px]">Expand the library with a new chronicle or book review.</p>
                        <Link href="/admin/content" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-emerald-50 transition-colors relative z-10">
                            Manage Content <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Recent Activity List */}
                    <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
                        <h3 className="font-serif text-lg font-bold text-stone-800 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { action: 'New User Signup', time: '2 mins ago', user: 'Rahul D.' },
                                { action: 'Started Reading "Palwankar Baloo"', time: '15 mins ago', user: 'Guest User' },
                                { action: 'Book Review Added', time: '2 hours ago', user: 'Admin' },
                                { action: 'System Backup', time: '5 hours ago', user: 'System' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 border-b border-stone-50 last:border-0 pb-3 last:pb-0">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                                    <div>
                                        <p className="text-sm font-medium text-stone-800">{item.action}</p>
                                        <div className="flex items-center gap-2 text-xs text-stone-400">
                                            <span>{item.time}</span>
                                            <span>•</span>
                                            <span>{item.user}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
