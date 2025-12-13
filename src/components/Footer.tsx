import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-stone-900 text-[#f0e6d2] py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="font-serif text-2xl font-bold mb-6">Cricket Field Chronicles</h3>
                    <p className="font-serif text-stone-400 leading-relaxed max-w-sm">
                        Celebrating the gentleman's game through unheard stories, forgotten gems, and the finest literature.
                    </p>
                </div>
                <div>
                    <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6">Explore</h4>
                    <ul className="space-y-3 font-serif text-stone-300">
                        <li><a href="/library" className="hover:text-emerald-400 transition-colors">The Library</a></li>
                        <li><a href="/about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                        <li><a href="/write-for-us" className="hover:text-emerald-400 transition-colors">Write For Us</a></li>
                        <li><a href="/awards" className="hover:text-emerald-400 transition-colors">Book Awards</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6">Connect</h4>
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-stone-800 border-none px-4 py-2 rounded-sm text-stone-200 placeholder-stone-600 focus:ring-1 focus:ring-emerald-500 outline-none flex-1 font-serif"
                        />
                        <button className="bg-emerald-800 hover:bg-emerald-700 text-[#f0e6d2] px-4 py-2 rounded-sm font-serif font-medium transition-colors">
                            Join
                        </button>
                    </form>
                    <div className="mt-8 text-stone-500 text-sm font-serif flex items-center justify-between">
                        <span>&copy; 2025 Cricket Field Chronicles.</span>
                        <Link href="/admin" className="text-stone-700 hover:text-emerald-500 transition-colors opacity-50 text-xs">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
