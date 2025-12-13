import React, { forwardRef, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface PageProps {
    number?: number;
    className?: string;
    type?: 'cover' | 'page';
}

export const Page = forwardRef<HTMLDivElement, PropsWithChildren<PageProps>>(
    ({ children, number, className, type = 'page' }, ref) => {
        return (
            <div
                className={clsx(
                    'demoPage bg-[#fdfbf7] h-full w-full shadow-lg overflow-hidden border-r border-[#e5e5e5] relative',
                    type === 'cover' ? 'bg-[#2c3e50] text-white' : 'text-stone-800',
                    className
                )}
                ref={ref}
            >
                {/* Paper Texture Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-0"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
                />

                <div className={clsx("h-full w-full relative z-10", type !== 'cover' && "p-8 md:p-12")}>
                    {children}
                    {number && (
                        <div className="absolute bottom-4 right-4 text-xs text-stone-400 font-serif">
                            {number}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Page.displayName = 'Page';
