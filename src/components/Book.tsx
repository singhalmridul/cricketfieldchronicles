'use client';

import React, { useRef, useState, useMemo } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Page } from './Page';
import { motion } from 'framer-motion';

// Helper to split text into pages (approximate)
// In a real app, this would be more sophisticated or pre-calculated
const splitContentToPages = (text: string, wordsPerPage: number = 180): string[] => {
    const words = text.split(' ');
    const pages: string[] = [];
    let currentPage = [];

    for (const word of words) {
        currentPage.push(word);
        if (currentPage.length >= wordsPerPage) {
            pages.push(currentPage.join(' '));
            currentPage = [];
        }
    }
    if (currentPage.length > 0) {
        pages.push(currentPage.join(' '));
    }
    return pages;
};

interface BlogData {
    id: string;
    title: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    coverColor?: string;
    spineColor?: string;
    textColor?: string;
    coverImage?: string;
    content: string;
}

interface BookProps {
    width?: number;
    height?: number;
    blog: BlogData;
    onClose?: () => void;
}

const Book: React.FC<BookProps> = ({ width = 400, height = 600, blog, onClose }) => {
    const bookRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [bookDimensions, setBookDimensions] = useState({ width, height });

    // Handle Resize
    React.useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Adjust dimensions for mobile to fit screen
            if (mobile) {
                // Calculation: Screen width minus padding
                const mobileWidth = Math.min(window.innerWidth - 32, 400);
                const mobileHeight = Math.min(window.innerHeight - 150, 600);
                setBookDimensions({ width: mobileWidth, height: mobileHeight });
            } else {
                setBookDimensions({ width, height });
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width, height]);

    // Dynamic words per page based on size - Reduced to prevent cutoff
    const wordsPerPage = isMobile ? 70 : 130;
    const contentPages = useMemo(() => splitContentToPages(blog.content, wordsPerPage), [blog.content, wordsPerPage]);

    // Theme colors with fallbacks
    const coverColor = blog.coverColor || 'bg-emerald-900';
    const textColor = blog.textColor || 'text-[#f0e6d2]';

    // Share Quote Logic
    const [shareTooltip, setShareTooltip] = useState<{ x: number, y: number, text: string } | null>(null);

    React.useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            if (!selection || selection.isCollapsed) {
                setShareTooltip(null);
                return;
            }

            const text = selection.toString().trim();
            if (text.length < 5) return; // Ignore accidental small selections

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Calculate position above selection
            // We use fixed positioning relative to viewport
            setShareTooltip({
                x: rect.left + rect.width / 2,
                y: rect.top - 10, // 10px above
                text: text
            });
        };

        // Debounce slightly to avoid flickering
        let timeout: NodeJS.Timeout;
        const debouncedHandleSelection = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleSelection, 200);
        };

        document.addEventListener('selectionchange', debouncedHandleSelection);
        return () => document.removeEventListener('selectionchange', debouncedHandleSelection);
    }, []);

    const handleShareTwitter = () => {
        if (!shareTooltip) return;
        const text = `"${shareTooltip.text.length > 200 ? shareTooltip.text.slice(0, 200) + '...' : shareTooltip.text}" - read more at Cricket Field Chronicles`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        setShareTooltip(null);
    };

    const handleCopy = () => {
        if (!shareTooltip) return;
        navigator.clipboard.writeText(`"${shareTooltip.text}" - ${blog.title}`);
        alert("Quote copied to clipboard!");
        setShareTooltip(null);
    };

    return (
        <div className="relative flex justify-center items-center py-10">
            {/* Share Tooltip */}
            {shareTooltip && (
                <div
                    className="fixed z-[100] flex gap-2 bg-stone-900 text-stone-100 p-2 rounded shadow-xl -translate-x-1/2 -translate-y-full after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-t-8 after:border-t-stone-900 after:border-x-8 after:border-x-transparent"
                    style={{ left: shareTooltip.x, top: shareTooltip.y }}
                >
                    <button
                        onClick={handleCopy}
                        className="px-3 py-1 bg-stone-700 hover:bg-stone-600 rounded text-xs font-bold uppercase tracking-wider"
                    >
                        Copy
                    </button>
                    <button
                        onClick={handleShareTwitter}
                        className="px-3 py-1 bg-[#1DA1F2] hover:bg-[#1a91da] rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                        Tweet
                    </button>
                </div>
            )}

            {/* Close/Back Button placed outside or handled by parent, but we can add a small control here */}
            {/* Close/Back Button - Fixed position on mobile for better accessibility */}
            {onClose && (
                <button
                    onClick={onClose}
                    className={`absolute bg-stone-800 text-stone-200 px-4 py-2 rounded-full text-sm font-serif hover:bg-stone-700 transition-colors z-50 shadow-lg ${isMobile ? 'fixed bottom-20 left-1/2 -translate-x-1/2 w-40' : '-top-12 right-0'}`}
                >
                    {isMobile ? 'Close Book' : 'Close Book ✕'}
                </button>
            )}

            {/* @ts-ignore - Library types might be finicky */}
            <HTMLFlipBook
                width={bookDimensions.width}
                height={bookDimensions.height}
                size="fixed"
                minWidth={300}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1200}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                usePortrait={isMobile}
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                useMouseEvents={true}
                swipeDistance={30}
                ref={bookRef}
                className="shadow-2xl"
                style={{ margin: '0 auto' }}
            >
                {/* Front Cover */}
                <Page type="cover" className={`${coverColor} border-r-2 border-black/20 relative overflow-hidden`}>
                    {/* Background Image */}
                    {blog.coverImage && (
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay grayscale-[30%] contrast-125 transition-opacity duration-500"
                            style={{ backgroundImage: `url(${blog.coverImage})` }}
                        />
                    )}

                    <div className={`h-full flex flex-col justify-center items-center text-center p-8 ${textColor} relative z-10`}>
                        <div className="mb-4 text-xs tracking-[0.2em] uppercase opacity-80 border-b border-current pb-2">{blog.category}</div>
                        <h1 className="text-4xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">{blog.title}</h1>
                        <div className="w-12 h-1 bg-current opacity-40 mb-6 rounded-full"></div>
                        <p className="text-lg italic font-light opacity-90">{blog.author}</p>
                        <div className="mt-auto text-xs opacity-60">Vol. 2025</div>
                    </div>
                </Page>

                {/* Inner Title Page */}
                <Page number={1}>
                    <div className="h-full flex flex-col justify-center items-center text-center p-8">
                        <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">{blog.title}</h2>
                        <div className="text-stone-400 text-sm italic mb-8">{blog.date} • {blog.readTime}</div>
                        <p className="text-xs text-stone-500 max-w-[200px]">
                            Published by<br />Cricket Field Chronicles
                        </p>
                    </div>
                </Page>

                {/* Content Pages */}
                {contentPages.map((text, index) => (
                    <Page key={`content-${index}`} number={2 + index}>
                        <div className="h-full flex flex-col p-2">
                            {/* Header for reading continuity */}
                            <div className="text-[10px] text-stone-400 text-center mb-4 uppercase tracking-widest font-sans">
                                {blog.title}
                            </div>

                            <div className="prose prose-stone prose-p:text-justify prose-p:text-[15px] prose-p:leading-relaxed font-serif flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent pr-2">
                                {text.split('\n').map((para, i) => (
                                    para.trim() ? <p key={i} className="mb-4 indent-4">{para}</p> : null
                                ))}
                            </div>

                            {/* Page Footer */}
                            <div className="mt-auto text-center text-xs text-stone-400 font-serif">
                                {2 + index}
                            </div>
                        </div>
                    </Page>
                ))}

                {/* Blank page if odd number of content pages to ensure back cover is on left/right correctly? 
                     Actually HTMLFlipBook handles this, but usually back cover should be last.
                 */}

                {/* Back Cover */}
                <Page type="cover" className={coverColor}>
                    <div className={`h-full flex flex-col justify-center items-center text-center ${textColor}`}>
                        <div className="opacity-60 text-sm tracking-widest uppercase mb-2">Cricket Field Chronicles</div>
                        <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center opacity-40">
                            <span className="text-xs">🏏</span>
                        </div>
                    </div>
                </Page>

            </HTMLFlipBook>
        </div>
    );
};

export default Book;
