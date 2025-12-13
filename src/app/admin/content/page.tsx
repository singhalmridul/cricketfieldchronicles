'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ContentTable from '../../../components/admin/ContentTable';
import AddEditBookModal from '../../../components/admin/AddEditBookModal';
import { getBlogs, saveBlog, deleteBlog } from '../../actions';

export default function ContentManagerPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<any>(null);

    const loadData = async () => {
        setIsLoading(true);
        const data = await getBlogs();
        setBlogs(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleEdit = (book: any) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this story?')) {
            await deleteBlog(id);
            await loadData();
        }
    };

    const handleSave = async (book: any) => {
        await saveBlog(book);
        await loadData();
    };

    const handleAddNew = () => {
        setEditingBook(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-stone-900">Content Manager</h1>
                    <p className="text-stone-500 mt-1">Manage your library collection.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-emerald-800 transition-colors"
                >
                    <Plus size={20} />
                    New Story
                </button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center p-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900"></div>
                </div>
            ) : (
                <ContentTable
                    data={blogs}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <AddEditBookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingBook}
            />
        </div>
    );
}
