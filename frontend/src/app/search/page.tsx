import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function SearchPage() {
    const searchResults = [
        { title: 'Baishe Srabon', year: 2011, director: 'Srijit Mukherji', rating: 4.8, poster: 'https://via.placeholder.com/150x225.png?text=Baishe+Srabon' },
        { title: 'Vinci Da', year: 2019, director: 'Srijit Mukherji', rating: 4.5, poster: 'https://via.placeholder.com/150x225.png?text=Vinci+Da' },
        { title: 'Byomkesh Bakshi', year: 2015, director: 'Dibakar Banerjee', rating: 4.2, poster: 'https://via.placeholder.com/150x225.png?text=Byomkesh' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#14181c]">
            <Navbar />

            <main className="flex-1 w-full lb-container py-8 flex flex-col lg:flex-row gap-8">

                {/* Search Input and Grid (Main Area) */}
                <div className="flex-1 lg:order-2">
                    <div className="mb-6 border-b border-[#2b3440] pb-6">
                        <h1 className="text-[#9ab] font-serif text-xl tracking-tight mb-4">Search</h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for Bengali films, series, directors, or actors..."
                                className="w-full bg-[#2b3440] border-none rounded focus:ring-1 focus:ring-[#00e054] p-3 pl-10 text-white text-base transition-colors"
                                defaultValue="Thriller"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ab] text-lg">🔍</span>
                        </div>
                    </div>

                    <div className="mb-4 flex justify-between items-baseline border-b border-[#2b3440] pb-2">
                        <h2 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold">Found {searchResults.length} matches</h2>
                        <div className="flex text-[#678] text-xs font-bold uppercase tracking-wider gap-3">
                            <button className="text-white">Grid</button>
                            <button className="hover:text-white transition-colors">Details</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
                        {searchResults.map((film, index) => (
                            <div key={index} className="group relative">
                                <div className="aspect-[2/3] rounded border border-[#2b3440] bg-[#2b3440] overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#00e054] transition-all relative">
                                    <Image src={film.poster} alt={film.title} layout="fill" className="object-cover" unoptimized />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center p-2 text-center">
                                        <h3 className="text-white font-bold leading-tight font-serif text-sm">{film.title}</h3>
                                        <p className="text-[#9ab] text-xs mt-1">{film.year}</p>
                                        <div className="text-[#00e054] text-xs mt-2">
                                            ★ {film.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center pt-8 border-t border-[#2b3440]">
                        <Button className="lb-button-secondary w-full md:w-auto">Show more matches</Button>
                    </div>
                </div>

                {/* Filters Sidebar */}
                <div className="w-full lg:w-64 shrink-0 lg:order-1 pt-2 lg:pt-0">
                    <div className="space-y-6">

                        <div>
                            <h3 className="text-[#9ab] uppercase tracking-wider text-xs font-semibold mb-3 border-b border-[#2b3440] pb-1">Sort By</h3>
                            <select className="w-full bg-[#2b3440] border-none rounded p-2 text-white text-sm focus:ring-1 focus:ring-[#00e054]" aria-label="Sort results by">
                                <option>Popularity (Descending)</option>
                                <option>Rating (Highest first)</option>
                                <option>Release Date (Newest first)</option>
                                <option>Title (A-Z)</option>
                            </select>
                        </div>

                        <div>
                            <h3 className="text-[#9ab] uppercase tracking-wider text-xs font-semibold mb-3 border-b border-[#2b3440] pb-1">Decade</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {['2020s', '2010s', '2000s', '1990s', '1980s', '1970s', 'Older'].map(decade => (
                                    <button key={decade} className="bg-[#2b3440] hover:bg-[#445566] text-[#9ab] hover:text-white text-xs px-2.5 py-1 rounded transition-colors">
                                        {decade}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[#9ab] uppercase tracking-wider text-xs font-semibold mb-3 border-b border-[#2b3440] pb-1">Genre</h3>
                            <div className="flex flex-col gap-1.5">
                                {['Drama', 'Thriller', 'Comedy', 'Romance', 'Action'].map(genre => (
                                    <label key={genre} className="flex items-center space-x-3 text-sm text-[#9ab] hover:text-white cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded border border-[#445566] bg-[#2b3440] text-[#00e054] focus:ring-[#00e054] focus:ring-offset-[#14181c]" />
                                        <span>{genre}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
