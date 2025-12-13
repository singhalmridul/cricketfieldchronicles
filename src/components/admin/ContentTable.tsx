'use client';

import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface ContentTableProps {
    data: any[];
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
}

const ContentTable: React.FC<ContentTableProps> = ({ data, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                        <th className="px-6 py-4 font-sans text-xs font-bold text-stone-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 font-sans text-xs font-bold text-stone-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-4 font-sans text-xs font-bold text-stone-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 font-sans text-xs font-bold text-stone-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 font-sans text-xs font-bold text-stone-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50/50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-serif font-bold text-stone-800">{item.title}</div>
                                <div className="text-xs text-stone-400 font-mono mt-1">{item.id}</div>
                            </td>
                            <td className="px-6 py-4 text-stone-600 text-sm">{item.author}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-stone-500 text-sm">{item.date}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-12 text-center text-stone-400">
                    No content found. Start by adding a new book.
                </div>
            )}
        </div>
    );
};

export default ContentTable;
