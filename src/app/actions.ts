'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export async function getBlogs() {
    try {
        await dbConnect();
        // Convert Mongoose documents to plain objects to avoid serialization issues in Server Components
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

        // MongoDB _id is distinct from our custom string id
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Failed to read blogs:', error);
        return [];
    }
}

export async function saveBlog(blog: any) {
    try {
        await dbConnect();

        // Upsert based on custom 'id'
        const result = await Blog.findOneAndUpdate(
            { id: blog.id },
            { ...blog },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return { success: true };
    } catch (error) {
        console.error('Failed to save blog:', error);
        return { success: false, error: 'Failed to save blog' };
    }
}

export async function deleteBlog(id: string) {
    try {
        await dbConnect();

        const result = await Blog.deleteOne({ id });

        if (result.deletedCount === 0) {
            console.warn(`[ContentManager] Warning: No blog found with id ${id} to delete.`);
        } else {
            console.log(`[ContentManager] Deleted blog with id ${id}`);
        }

        // Revalidate the admin page and potentially public pages
        revalidatePath('/admin/content');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete blog:', error);
        return { success: false, error: 'Failed to delete blog' };
    }
}
