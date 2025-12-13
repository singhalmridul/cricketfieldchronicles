'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const BLOGS_FILE_PATH = path.join(process.cwd(), 'src/data/blogs.json');

export async function getBlogs() {
    try {
        const data = await fs.readFile(BLOGS_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read blogs:', error);
        return [];
    }
}

export async function saveBlog(blog: any) {
    try {
        const blogs = await getBlogs();
        const index = blogs.findIndex((b: any) => b.id === blog.id);

        if (index !== -1) {
            // Update existing
            blogs[index] = blog;
        } else {
            // Add new
            blogs.push(blog);
        }

        await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(blogs, null, 4));
        return { success: true };
    } catch (error) {
        console.error('Failed to save blog:', error);
        return { success: false, error: 'Failed to save blog' };
    }
}

export async function deleteBlog(id: string) {
    try {
        const blogs = await getBlogs();
        // Convert both to strings and trim to ensure robust comparison
        const initialLength = blogs.length;
        const filteredBlogs = blogs.filter((b: any) => String(b.id) !== String(id));

        if (filteredBlogs.length === initialLength) {
            console.warn(`[ContentManager] Warning: No blog found with id ${id} to delete.`);
        } else {
            console.log(`[ContentManager] Deleting blog ${id}. Count before: ${initialLength}, after: ${filteredBlogs.length}`);
        }

        await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(filteredBlogs, null, 4));

        // Revalidate the admin page and potentially public pages
        revalidatePath('/admin/content');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete blog:', error);
        return { success: false, error: 'Failed to delete blog' };
    }
}
