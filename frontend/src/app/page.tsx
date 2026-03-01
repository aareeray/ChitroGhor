import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function Home() {
  // Dummy data
  const popularFilms = [
    { title: 'Pather Panchali', year: 1955, director: 'Satyajit Ray', poster: 'https://image.tmdb.org/t/p/w500/5OcsXn5ZqYEq81S8lZ8C7mJ3yV8.jpg' },
    { title: 'Dawshom Awbotaar', year: 2023, director: 'Srijit Mukherji', poster: 'https://image.tmdb.org/t/p/w200/5OcsXn5ZqYEq81S8lZ8C7mJ3yV8.jpg' },
    { title: 'Meghe Dhaka Tara', year: 1960, director: 'Ritwik Ghatak', poster: 'https://via.placeholder.com/200x300.png?text=Meghe' },
    { title: 'Charulata', year: 1964, director: 'Satyajit Ray', poster: 'https://via.placeholder.com/200x300.png?text=Charulata' },
    { title: 'Bojhena Shey Bojhena', year: 2012, director: 'Raj Chakraborty', poster: 'https://via.placeholder.com/200x300.png?text=Bojhena' },
    { title: 'Bhooter Bhabishyat', year: 2012, director: 'Anik Dutta', poster: 'https://via.placeholder.com/200x300.png?text=Bhooter' },
  ];

  const recentReviews = [
    { id: 1, user: 'bengal_cinephile', film: 'Pather Panchali', rating: 5, review: 'Pure poetry on celluloid.', poster: 'https://image.tmdb.org/t/p/w500/5OcsXn5ZqYEq81S8lZ8C7mJ3yV8.jpg', avatar: 'B' },
    { id: 2, user: 'hoichoi_watcher', film: 'Indu', rating: 4, review: 'A solid thriller that keeps you guessing until the end.', poster: 'https://via.placeholder.com/200x300.png?text=Indu', avatar: 'H' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#14181c]">
      <Navbar />

      {/* Backdrop simulation */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-black border-b border-[#2b3440] overflow-hidden -mt-[70px] z-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-[#14181c]/80 to-transparent z-10"></div>
        <Image src="https://image.tmdb.org/t/p/original/mXv49iA22x1l20aIIfj3aU9t23M.jpg" alt="Backdrop" layout="fill" className="object-cover opacity-30 blur-sm object-top" unoptimized />
      </div>
      <div className="relative w-full h-[400px] flex items-center justify-center z-20">
        <div className="absolute z-20 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">Track films you&apos;ve watched.<br />Save those you want to see.<br />Tell your friends what&apos;s good.</h1>
          <Button size="lg" className="lb-button text-lg mt-4 shadow-lg shadow-[#00e054]/20 border border-[#00c04b]">GET STARTED &mdash; IT&apos;S FREE!</Button>
          <p className="mt-4 text-[#9ab] text-sm font-semibold">The social network for Bengali cinema lovers.</p>
        </div>
      </div>

      <main className="flex-1 w-full lb-container py-12 relative z-30">

        {/* Popular Section */}
        <section className="mb-12">
          <div className="flex justify-between items-baseline mb-3 border-b border-[#2b3440] pb-2">
            <h2 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold hover:text-white transition-colors cursor-pointer">Popular films this week</h2>
            <span className="text-xs text-[#678] font-bold uppercase hover:text-white cursor-pointer transition-colors">More</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4">
            {popularFilms.map((film, i) => (
              <div key={i} className="group relative rounded hover:ring-2 hover:ring-[#00e054] transition-all cursor-pointer">
                <div className="aspect-[2/3] bg-gray-800 rounded border border-[#2b3440] overflow-hidden relative">
                  <Image src={film.poster} alt={film.title} layout="fill" className="object-cover" unoptimized />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Reviews Section */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <div className="flex justify-between items-baseline mb-3 border-b border-[#2b3440] pb-2">
                <h2 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold hover:text-white transition-colors cursor-pointer">Recent reviews from friends</h2>
                <span className="text-xs text-[#678] font-bold uppercase hover:text-white cursor-pointer transition-colors">Log a film</span>
              </div>

              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="flex gap-4 p-4 lb-card hover:border-[#456] transition-colors">
                    <div className="w-20 shrink-0">
                      <div className="aspect-[2/3] rounded border border-[#2b3440] bg-[#2b3440] overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#00e054] transition-all relative">
                        <Image src={review.poster} alt={review.film} layout="fill" className="object-cover" unoptimized />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                          {review.avatar}
                        </div>
                        <span className="text-[#9ab] text-sm font-bold">{review.user}</span>
                        <span className="text-[#678] text-xs">watched</span>
                      </div>
                      <h3 className="text-white font-bold font-serif text-lg leading-tight hover:text-[#00e054] cursor-pointer mb-1">{review.film}</h3>
                      <div className="text-[#00e054] text-sm mb-2">{'★'.repeat(review.rating)}</div>
                      <p className="text-[#9ab] text-sm leading-relaxed font-serif">&quot;{review.review}&quot;</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar List */}
          <div className="col-span-1">
            <section>
              <div className="flex justify-between items-baseline mb-3 border-b border-[#2b3440] pb-2">
                <h2 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold hover:text-white transition-colors cursor-pointer">News & Features</h2>
              </div>

              <div className="lb-card p-4 space-y-4">
                <div>
                  <div className="relative w-full h-32 rounded border border-[#2b3440] mb-2 overflow-hidden">
                    <Image src="https://via.placeholder.com/300x150.png?text=Editorial" alt="Editorial" layout="fill" className="object-cover" unoptimized />
                  </div>
                  <h3 className="text-white font-serif font-bold hover:text-[#00e054] cursor-pointer">The Enduring Legacy of Satyajit Ray&apos;s Calcutta Trilogy</h3>
                  <p className="text-xs text-[#678] mt-1">By Film Desk</p>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="flex justify-between items-baseline mb-3 border-b border-[#2b3440] pb-2">
                <h2 className="text-[#9ab] font-serif uppercase tracking-wider text-sm font-semibold">Join the Crew</h2>
              </div>
              <div className="lb-card p-4 text-center">
                <p className="text-[#9ab] text-sm mb-4">ChitroGhor is made by fans, for fans. Rate films based on our 5-star scale.</p>
                <Button className="lb-button-secondary w-full text-sm">Create an Account</Button>
              </div>
            </section>
          </div>

        </div>

      </main>
    </div>
  );
}
