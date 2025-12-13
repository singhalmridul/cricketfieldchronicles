'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import LibraryShelf from '../components/LibraryShelf';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleBookClick = (blog: any) => {
    // For now, redirect to library or open modal? 
    // Let's redirect to library with query param or just simple navigation
    router.push('/library');
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main>
        <Hero />

        {/* Featured / Recent Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-sans text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">Curated Collection</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mt-4 mb-6">Recent Additions</h2>
                <div className="w-24 h-1 bg-emerald-900 mx-auto opacity-20"></div>
              </motion.div>
            </div>

            {/* Display a preview of the shelf (slice of 4-5 items) */}
            {/* We reuse LibraryShelf but maybe strictly controlled or just a few items */}
            {/* For this MVP, let's just render the LibraryShelf but it will show all. 
                    Ideally we'd pass a prop to limit it, but scrolling is fine. 
                    Actually, let's just show a button to view all if we rendered all.
                */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none h-full" />
              <LibraryShelf onBookClick={handleBookClick} />

              <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/library')}
                  className="bg-white border border-stone-200 shadow-xl px-8 py-3 rounded-full font-serif text-emerald-900 flex items-center gap-2 hover:bg-emerald-50"
                >
                  View Full Library <span className="text-lg">📚</span>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / Quote Section */}
        <section className="py-24 bg-emerald-900 text-[#f0e6d2] relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/2 -translate-y-1/2">
            <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>
          <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
            <h3 className="font-serif text-3xl md:text-4xl italic mb-8">
              "Cricket is a pressure game, and when it comes to an India-Pakistan match the pressure is doubled."
            </h3>
            <p className="font-sans uppercase tracking-widest text-sm opacity-60">- Imran Khan</p>

            <div className="mt-16 p-8 border border-[#f0e6d2]/20 rounded-lg bg-emerald-950/30 backdrop-blur-sm">
              <h4 className="font-serif text-xl mb-4">Subscribe to the Chronicles</h4>
              <p className="text-sm opacity-70 mb-6 max-w-md mx-auto">Get new stories delivered directly to your inbox. No spam, just cricket.</p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input type="email" placeholder="Your email" className="flex-1 bg-transparent border-b border-[#f0e6d2]/40 focus:border-[#f0e6d2] outline-none py-2 text-[#f0e6d2] placeholder-[#f0e6d2]/30" />
                <button className="font-sans text-xs font-bold uppercase tracking-widest hover:text-emerald-400">Subscribe</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
