'use client';

import React from 'react';
import { User, Mail, Calendar, MapPin } from 'lucide-react';

const users = [
    { id: 1, name: 'Rahul Dravid', email: 'rahul.wall@example.com', joined: 'Jan 12, 2024', location: 'Bangalore, India', status: 'Active' },
    { id: 2, name: 'Sachin Tendulkar', email: 'god@example.com', joined: 'Feb 24, 2024', location: 'Mumbai, India', status: 'Active' },
    { id: 3, name: 'Ricky Ponting', email: 'punter@example.com', joined: 'Mar 05, 2024', location: 'Tasmania, Aus', status: 'Inactive' },
    { id: 4, name: 'Brian Lara', email: 'prince@example.com', joined: 'Apr 12, 2024', location: 'Trinidad', status: 'Active' },
];

export default function UsersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-serif text-3xl font-bold text-stone-900">User Insights</h1>
                <p className="text-stone-500 mt-1">View registered reader details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-500">
                            <User size={24} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-stone-800">{user.name}</h3>
                                    <div className="flex items-center gap-2 text-stone-400 text-sm mt-1">
                                        <Mail size={14} />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                                    {user.status}
                                </span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-stone-100 flex gap-4 text-xs text-stone-500">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    Joined {user.joined}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {user.location}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
