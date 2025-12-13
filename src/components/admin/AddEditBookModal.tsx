'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    date: string;
    content: string;
    coverColor?: string;
    spineColor?: string;
}

interface AddEditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (book: Book) => Promise<void>;
    initialData?: Book | null;
}

const AddEditBookModal: React.FC<AddEditBookModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState<Book>({
        id: '',
        title: '',
        author: '',
        category: 'History',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        content: '',
        coverColor: 'bg-emerald-900',
        spineColor: 'bg-emerald-950',
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                id: '',
                title: '',
                author: '',
                category: 'History',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                content: '',
                coverColor: 'bg-emerald-900',
                spineColor: 'bg-emerald-950',
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Generate ID if missing
        const dataToSave = {
            ...formData,
            id: formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        };

        await onSave(dataToSave);
        setIsSaving(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                            <h2 className="font-serif text-xl font-bold text-stone-800">
                                {initialData ? 'Edit Story' : 'New Story'}
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-serif"
                                        placeholder="e.g. The Greatest Chase"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Author</label>
                                    <input
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-serif"
                                        placeholder="Author Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-sans"
                                    >
                                        <option>History</option>
                                        <option>Match Report</option>
                                        <option>Book Review</option>
                                        <option>Travel</option>
                                        <option>Opinion</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Cover Color (Tailwind)</label>
                                    <input
                                        name="coverColor"
                                        value={formData.coverColor}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-sm"
                                        placeholder="bg-emerald-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Content</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows={10}
                                    className="w-full p-4 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-serif leading-relaxed text-stone-700"
                                    placeholder="Write your story here..."
                                />
                                <p className="text-xs text-stone-400 text-right">Markdown supported</p>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSaving}
                                className="px-6 py-2 bg-emerald-900 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-emerald-800 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                Save Story
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddEditBookModal;
