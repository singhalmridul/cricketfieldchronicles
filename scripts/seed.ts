import mongoose from 'mongoose';
import Blog from '../src/models/Blog';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read existing JSON data
        const jsonPath = path.join(process.cwd(), 'src/data/blogs.json');
        const fileData = fs.readFileSync(jsonPath, 'utf-8');
        const blogs = JSON.parse(fileData);

        console.log(`Found ${blogs.length} blogs in JSON file.`);

        // Clear existing data (optional, or upsert)
        // await Blog.deleteMany({});
        // console.log('Cleared existing blogs collection');

        // Upsert data
        for (const blog of blogs) {
            await Blog.findOneAndUpdate(
                { id: blog.id },
                { ...blog },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`Processed: ${blog.title}`);
        }

        console.log('Migration completed successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

seedData();
