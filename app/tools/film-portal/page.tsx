"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  image: string;
  trailerUrl?: string; // iTunes native mp4 trailer
  description: string;
}

export default function FilmPortal() {
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Live Internet API Search Function using Reliable iTunes API
  const searchMovies = async () => {
    if (!search.trim()) {
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    
    try {
      // 100% Reliable API that provides High-Res Posters and Native MP4 Trailers. No proxy needed!
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(search)}&entity=movie&limit=15`);
      const payload = await res.json();
      
      const apiMovies: Movie[] = payload.results.map((item: any) => ({
        id: item.trackId.toString(),
        title: item.trackName,
        year: item.releaseDate ? item.releaseDate.substring(0, 4) : "N/A",
        genre: item.primaryGenreName,
        image: item.artworkUrl100 ? item.artworkUrl100.replace("100x100bb", "600x600bb") : "",
        trailerUrl: item.previewUrl,
        description: item.longDescription || item.shortDescription || "No detailed description available for this title."
      }));

      setMovies(apiMovies);
    } catch (err) {
      console.error("Failed to fetch movies", err);
      alert("Search engine failed. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/40 via-purple-900/10 to-[#020617] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex-1 w-full">
        <Link href="/tools" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-10 transition-all hover:-translate-x-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Tools Lab
        </Link>

        {/* Header & Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-500/20 text-cyan-400 font-bold text-sm tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              P2P TORRENT HUB
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Film <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Portal</span>
            </h1>
          </div>

          <div className="w-full md:w-auto relative flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full sm:w-auto">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search movies for torrents..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchMovies()}
                className="w-full sm:w-[400px] bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-xl"
              />
            </div>
            <button 
              onClick={searchMovies}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Initial Empty View */}
        {!searched && !loading && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <svg className="w-24 h-24 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
            <p className="text-xl">Search any movie above to grab HQ torrents instantly.</p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
             <div className="bg-black/50 p-6 rounded-3xl backdrop-blur">
               <svg className="animate-spin h-10 w-10 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             </div>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && searched && movies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {movies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setActiveMovie(movie)}
                className="group cursor-pointer relative"
              >
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl mb-4 bg-gray-800 border-2 border-transparent group-hover:border-cyan-500 transition-colors">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/80 backdrop-blur flex items-center justify-center text-white mb-2 mx-auto transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg shadow-green-500/50">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-100 group-hover:text-cyan-400 transition-colors truncate">{movie.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                  <span>{movie.year}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-white">4K / 1080p</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && searched && movies.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-lg">
            Sorry, couldn't find any movie matching "{search}".
          </div>
        )}
      </div>

      {/* Pop-up Download & Theater Overlay */}
      <AnimatePresence>
        {activeMovie && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-3xl"
          >
            <div className="absolute inset-0" onClick={() => setActiveMovie(null)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-gray-800 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.1)] flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={() => setActiveMovie(null)}
                  className="w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-red-500 transition-colors backdrop-blur-md shadow-xl border border-white/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Left Side: Native MP4 Trailer */}
              <div className="w-full md:w-5/12 bg-black flex flex-col relative">
                {activeMovie.trailerUrl ? (
                  <div className="w-full aspect-video bg-black flex items-center justify-center relative shadow-2xl z-10">
                    <video 
                      controls autoPlay playsInline
                      src={activeMovie.trailerUrl} 
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gray-900 border-b border-gray-800 flex items-center justify-center text-gray-500 z-10">
                    No Trailer Available
                  </div>
                )}
                
                {/* Visual Artwork Background Effect */}
                <div className="flex-1 relative overflow-hidden hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10" />
                  <img src={activeMovie.image} className="w-full h-full object-cover opacity-30 blur-sm scale-110" />
                </div>
              </div>

              {/* Right Side: Info and Torrent Deep Links */}
              <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col overflow-y-auto">
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-white pb-2 border-b border-white/5">{activeMovie.title}</h2>
                <div className="flex gap-3 items-center text-sm font-semibold tracking-wide mb-6 mt-2">
                  <span className="text-cyan-400">{activeMovie.genre.toUpperCase()}</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-gray-300">{activeMovie.year}</span>
                </div>
                
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 overflow-auto">
                  {activeMovie.description}
                </p>

                <div className="mt-auto">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    Download Torrents
                  </h3>
                  
                  <div className="grid gap-3">
                    {/* Torrent Option 1: YTS Hub Deep Link */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/10 transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg text-white">YTS Direct Source</span>
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/50 text-green-400 border border-green-500/30 uppercase">
                            RECOMMENDED
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 font-medium">Grab 720p, 1080p, and 4K Torrents safely.</div>
                      </div>
                      
                      <a 
                        href={`https://yts.mx/browse-movies/${encodeURIComponent(activeMovie.title)}`}
                        target="_blank"
                        className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-all shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Get on YTS
                      </a>
                    </div>

                    {/* Torrent Option 2: 1337x Hub Deep Link */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/10 transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg text-white">1337x Search</span>
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-900/50 text-indigo-400 border border-indigo-500/30 uppercase">
                            MAGNETS
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 font-medium">Alternative hub for direct Magnet Links.</div>
                      </div>
                      
                      <a 
                        href={`https://1337x.to/search/${encodeURIComponent(activeMovie.title)}/1/`}
                        target="_blank"
                        className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                        Get on 1337x
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
