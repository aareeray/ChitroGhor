import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function ProfilePage() {
    const profile = {
        username: 'satyajit_fan',
        bio: 'Cinema student. Lover of classic Bengali arthouse.',
        filmsWatched: 342,
        thisYear: 84,
        followers: 128,
        following: 156,
    };

    const favoriteFilms = [
        { title: 'Apur Sansar', poster: 'https://via.placeholder.com/150x225.png?text=Apur+Sansar' },
        { title: 'Charulata', poster: 'https://via.placeholder.com/150x225.png?text=Charulata' },
        { title: 'Meghe Dhaka Tara', poster: 'https://via.placeholder.com/150x225.png?text=Meghe' },
        { title: 'Pather Panchali', poster: 'https://via.placeholder.com/150x225.png?text=Pather' }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#14181c]">
            <Navbar />

            <main className="flex-1 w-full lb-container py-8">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between border-b border-[#2b3440] pb-8 mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-[100px] h-[100px] rounded-full bg-[#2b3440] flex items-center justify-center text-3xl font-bold border-4 border-[#14181c] shadow-xl text-[#9ab]">
                            {profile.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1 font-serif">{profile.username}</h1>
                            <p className="text-[#9ab] max-w-sm">{profile.bio}</p>
                            <div className="flex gap-3 mt-3">
                                <button className="lb-button-secondary text-xs uppercase tracking-wider py-1">Edit Profile</button>
                                <button className="lb-button-secondary text-xs uppercase tracking-wider py-1">Share</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-8 mt-6 md:mt-0 text-center">
                        <div className="group cursor-pointer">
                            <div className="text-2xl font-bold text-white group-hover:text-[#00e054] transition-colors">{profile.filmsWatched}</div>
                            <div className="text-[10px] text-[#678] uppercase font-bold tracking-wider">Films</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-2xl font-bold text-white group-hover:text-[#00e054] transition-colors">{profile.thisYear}</div>
                            <div className="text-[10px] text-[#678] uppercase font-bold tracking-wider">This Year</div>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="text-2xl font-bold text-white group-hover:text-[#00e054] transition-colors">{profile.followers}</div>
                            <div className="text-[10px] text-[#678] uppercase font-bold tracking-wider">Followers</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {/* Favorites */}
                        <div className="mb-12">
                            <div className="flex justify-between items-baseline mb-3 border-b border-[#2b3440] pb-2">
                                <h3 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold hover:text-white transition-colors cursor-pointer">Favorite Films</h3>
                            </div>
                            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-3xl">
                                {favoriteFilms.map((film, index) => (
                                    <div key={index} className="aspect-[2/3] rounded border border-[#2b3440] bg-gray-800 hover:ring-2 hover:ring-[#00e054] transition-all cursor-pointer overflow-hidden group relative">
                                        <Image src={film.poster} alt={film.title} layout="fill" className="object-cover" unoptimized />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Diary Entries */}
                        <div>
                            <div className="flex justify-between items-baseline mb-3 border-b border-[#2b3440] pb-2">
                                <h3 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold hover:text-white transition-colors cursor-pointer">Recent Diary Entries</h3>
                            </div>
                            <div className="space-y-1">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex justify-between items-center bg-[#2b3440]/30 hover:bg-[#2b3440] p-3 rounded-sm transition cursor-pointer">
                                        <div className="flex items-center space-x-4">
                                            <div className="aspect-[2/3] w-8 h-12 bg-gray-800 rounded-sm border border-[#2b3440] overflow-hidden relative">
                                                <Image src={`https://via.placeholder.com/150x225.png?text=Log${item}`} alt={`Log ${item}`} layout="fill" className="object-cover" unoptimized />
                                            </div>
                                            <span className="font-bold text-white font-serif hover:text-[#00e054]">Byomkesh Bakshi</span>
                                            <span className="text-[#678] text-sm hidden sm:inline">2024</span>
                                        </div>
                                        <div className="flex space-x-8 items-center text-sm">
                                            <span className="text-[#00e054]">★★★★</span>
                                            <span className="text-[#678] hidden md:inline text-xs uppercase tracking-wider">2 days ago</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-1 border-l border-[#2b3440] pl-8">
                        <section className="mb-8">
                            <h3 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold mb-3 border-b border-[#2b3440] pb-2">Watchlist</h3>
                            <div className="grid grid-cols-4 min-gap-1">
                                {[1, 2, 3, 4].map(idx => (
                                    <div key={idx} className="aspect-[2/3] bg-gray-800 border border-[#2b3440] rounded-sm m-0.5 relative">
                                        <Image src={`https://via.placeholder.com/150x225.png?text=WL${idx}`} alt={`Watchlist film ${idx}`} layout="fill" className="object-cover rounded-sm" unoptimized />
                                    </div>
                                ))}
                            </div>
                            <Button className="lb-button-secondary w-full text-xs mt-3 uppercase tracking-wider">Show Watchlist</Button>
                        </section>

                        <section>
                            <h3 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold mb-3 border-b border-[#2b3440] pb-2">Recent Lists</h3>
                            <div className="space-y-4">
                                <div className="cursor-pointer group">
                                    <h4 className="text-white font-serif hover:text-[#00e054] mb-1">Bengali Neo-Noir</h4>
                                    <div className="flex items-center space-x-2 text-[#678] text-xs">
                                        <span>14 films</span>
                                    </div>
                                </div>
                                <div className="cursor-pointer group">
                                    <h4 className="text-white font-serif hover:text-[#00e054] mb-1">Rituparno Ghosh Essentials</h4>
                                    <div className="flex items-center space-x-2 text-[#678] text-xs">
                                        <span>9 films</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </main>
        </div>
    );
}
