"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Placeholder direct stream (lofi hip hop radio)
  const audioUrl = "https://a.files.bbci.co.uk/media/live/manifesto/audio/simulcast/hls/nonuk/sbr_low/ak/bbc_radio_one.m3u8"; // Using a BBC Radio 1 or similar stream, or a free mp3 url. 
  // Let's use a standard mp3 for better <audio> compatibility without hls.js.
  const fallbackMp3 = "https://cdn.pixabay.com/audio/2022/10/25/audio_22c7104b90.mp3"; // Royalty free cyber/lofi track from Pixabay

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.error("Audio play failed:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div 
      className="fixed bottom-6 left-6 z-[100] flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} loop src={fallbackMp3} />
      
      {/* Player Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20 transition-all ${
          isPlaying 
            ? "bg-pink-500 text-white shadow-pink-500/50" 
            : "bg-black/50 text-white hover:bg-black/70"
        }`}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg> // Pause
        ) : (
          <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> // Play
        )}
      </motion.button>

      {/* Expanded Track Info */}
      <AnimatePresence>
        {(isHovered || isPlaying) && (
          <motion.div
            initial={{ opacity: 0, x: -20, rotateX: 90 }}
            animate={{ opacity: 1, x: 0, rotateX: 0 }}
            exit={{ opacity: 0, x: -20, rotateX: 90 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-4"
          >
            {/* Visualizer bars */}
            <div className="flex items-end h-6 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%",
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + i * 0.1,
                    ease: "easeInOut",
                  }}
                  className={`w-1.5 rounded-full ${isPlaying ? "bg-pink-400" : "bg-gray-500"}`}
                />
              ))}
            </div>
            
            <div className="flex flex-col">
              <span className="text-white text-sm font-bold leading-tight">Vibe Station</span>
              <span className="text-gray-400 text-xs truncate max-w-[100px]">{isPlaying ? "Now Playing..." : "Paused"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
