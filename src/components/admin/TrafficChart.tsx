'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', visits: 4000, views: 2400 },
    { name: 'Tue', visits: 3000, views: 1398 },
    { name: 'Wed', visits: 2000, views: 9800 },
    { name: 'Thu', visits: 2780, views: 3908 },
    { name: 'Fri', visits: 1890, views: 4800 },
    { name: 'Sat', visits: 2390, views: 3800 },
    { name: 'Sun', visits: 3490, views: 4300 },
];

const TrafficChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg font-bold text-stone-800">Weekly Traffic Overview</h3>
                <select className="bg-stone-50 border-none text-xs font-bold rounded-md px-3 py-1 text-stone-500 cursor-pointer outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Year to Date</option>
                </select>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#064e3b" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#064e3b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#064e3b', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="visits"
                            stroke="#064e3b"
                            strokeWidth={3}
                            fill="url(#colorVisits)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrafficChart;
