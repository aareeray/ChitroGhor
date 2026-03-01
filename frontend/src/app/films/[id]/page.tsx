import { Navbar } from '@/components/layout/Navbar';
import Image from 'next/image';

export default function FilmDetailPage() {
    // Mock data for preview
    const film = {
        title_bn: 'পথের পাঁচালী',
        title_en: 'Pather Panchali',
        director: 'Satyajit Ray',
        release_year: 1955,
        runtime: 125,
        synopsis_en: 'Impoverished priest Harihar Ray, dreaming of a better life for himself and his family, leaves his rural Bengal village in search of work.',
        poster: 'https://image.tmdb.org/t/p/w500/5OcsXn5ZqYEq81S8lZ8C7mJ3yV8.jpg',
        ott_platforms: ['Hoichoi', 'Amazon Prime'],
        avg_rating: 4.8
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#14181c]">
            <Navbar />

            <main className="flex-1 w-full relative">
                {/* Backdrop simulation */}
                <div className="absolute top-0 inset-x-0 h-[500px] bg-black border-b border-[#2b3440] overflow-hidden -mt-[70px] z-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-[#14181c]/80 to-transparent z-10"></div>
                    <Image src={film.poster} alt="Backdrop" layout="fill" className="object-cover opacity-20 blur-md object-top" unoptimized />
                </div>

                <div className="lb-container pt-32 pb-12 relative z-20 flex flex-col md:flex-row gap-8">

                    {/* Poster & Actions Column */}
                    <div className="w-full md:w-[230px] shrink-0 mx-auto md:mx-0 -mt-16">
                        <div className="aspect-[2/3] rounded shadow-2xl border border-[#2b3440] bg-gray-900 overflow-hidden mb-4 group relative">
                            <Image src={film.poster} alt={film.title_en} layout="fill" className="object-cover" unoptimized />
                            <div className="absolute inset-x-0 bottom-0 bg-black/80 h-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                <span className="text-white hover:text-[#00e054] cursor-pointer" title="Watchlist">👁</span>
                                <span className="text-white hover:text-[#00e054] cursor-pointer" title="Like">♥</span>
                            </div>
                        </div>

                        <div className="bg-[#2b3440] rounded shadow">
                            <div className="grid grid-cols-4 divide-x divide-[#14181c] text-center text-[#9ab] border-b border-[#14181c] text-sm">
                                <button type="button" aria-label="Watch/Watched" className="py-2 hover:text-white hover:bg-[#445566] transition-colors" title="Watch/Watched">👁</button>
                                <button type="button" aria-label="Like" className="py-2 hover:text-white hover:bg-[#445566] transition-colors" title="Like">♥</button>
                                <button type="button" aria-label="Watchlist" className="py-2 hover:text-white hover:bg-[#445566] transition-colors" title="Watchlist">⏱</button>
                                <button type="button" aria-label="Review" className="py-2 hover:text-white hover:bg-[#445566] transition-colors" title="Review">★★</button>
                            </div>
                            <button type="button" className="w-full text-center py-2 text-sm font-bold text-[#9ab] hover:text-white transition-colors">
                                Log or review
                            </button>
                        </div>

                        <div className="mt-6 lb-card p-3">
                            <h4 className="text-[#9ab] text-xs font-semibold uppercase tracking-wider mb-2 border-b border-[#2b3440] pb-1">Where to watch</h4>
                            <div className="flex flex-col gap-2">
                                {film.ott_platforms.map(platform => (
                                    <button key={platform} className="text-xs bg-[#2b3440] hover:bg-[#445566] text-white border border-[#445566] py-1.5 rounded transition-colors w-full text-left px-3 font-semibold">
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="flex-1 mt-8 md:mt-0">
                        <div className="flex items-baseline space-x-3 mb-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-white font-serif tracking-tight">
                                {film.title_en}
                            </h1>
                            <h2 className="text-2xl text-[#678] font-serif hover:text-[#9ab] cursor-pointer transition-colors">{film.release_year}</h2>
                        </div>

                        <h2 className="text-lg text-[#9ab] mb-4 font-serif italic">{film.title_bn}</h2>

                        <div className="flex items-center space-x-2 mb-6 text-sm text-[#9ab] border-b border-[#2b3440] pb-4 uppercase font-semibold text-xs tracking-wider">
                            <span>Directed by <span className="text-white hover:text-[#00e054] cursor-pointer border-b border-transparent hover:border-[#00e054] pb-px transition-colors">{film.director}</span></span>
                            <span>•</span>
                            <span>{film.runtime} mins</span>
                            <div className="ml-auto flex items-center space-x-2 bg-[#2b3440] px-3 py-1 rounded">
                                <span className="text-[#00e054] font-bold">★ {film.avg_rating}</span>
                            </div>
                        </div>

                        <p className="text-[#9ab] text-base leading-relaxed mb-8 max-w-2xl font-serif">
                            {film.synopsis_en}
                        </p>

                        {/* Reviews Section */}
                        <div className="pt-4">
                            <div className="flex justify-between items-baseline mb-4 border-b border-[#2b3440] pb-2">
                                <h3 className="text-[#9ab] uppercase tracking-wider font-semibold text-sm hover:text-white transition-colors cursor-pointer">Popular Reviews</h3>
                                <span className="text-xs text-[#678] font-bold uppercase hover:text-white cursor-pointer transition-colors">More</span>
                            </div>

                            <div className="space-y-4 max-w-3xl">
                                <div className="flex gap-4 p-4 lb-card hover:border-[#456] transition-colors">
                                    <div className="w-10 h-10 shrink-0 mt-1 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">C</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[#9ab] font-bold hover:text-white cursor-pointer">cinephile_bd</span>
                                            <div className="text-[#00e054] text-xs">★★★★★</div>
                                        </div>
                                        <p className="text-[#9ab] font-serif text-base leading-relaxed">
                                            A cinematic triumph. The cinematography is groundbreaking and the storytelling is universally human yet distinctly Bengali. Every frame is a painting.
                                        </p>
                                        <div className="mt-3 text-xs text-[#678] flex gap-4">
                                            <button className="hover:text-white">Like</button>
                                            <button className="hover:text-white">Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
