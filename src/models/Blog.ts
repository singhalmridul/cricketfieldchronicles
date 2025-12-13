import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    id: string; // Custom string ID like "palwankar-baloo"
    title: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    content: string;
    coverImage?: string;
    coverColor?: string;
    spineColor?: string;
    textColor?: string;
    createdAt: Date;
}

const BlogSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    coverColor: { type: String, default: 'bg-emerald-900' },
    spineColor: { type: String, default: 'bg-emerald-950' },
    textColor: { type: String, default: 'text-[#f0e6d2]' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
