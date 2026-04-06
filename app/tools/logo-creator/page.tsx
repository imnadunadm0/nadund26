"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Predefined professional gradient themes
const gradients = [
  { id: "g1", start: "#ec4899", end: "#8b5cf6" }, // Pink to Purple
  { id: "g2", start: "#3b82f6", end: "#06b6d4" }, // Blue to Cyan
  { id: "g3", start: "#10b981", end: "#3b82f6" }, // Emerald to Blue
  { id: "g4", start: "#f59e0b", end: "#ef4444" }, // Orange to Red
  { id: "g5", start: "#6366f1", end: "#ec4899" }, // Indigo to Pink
];

// Predefined vector container shapes
const shapes = [
  "hexagon", "circle", "shield", "square"
];

export default function LogoCreator() {
  const [prompt, setPrompt] = useState("");
  const [logoData, setLogoData] = useState<{
    text: string;
    letters: string;
    gradient: { id: string; start: string; end: string };
    shape: string;
  } | null>(null);
  
  const [loading, setLoading] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const generateLogo = () => {
    if (!prompt.trim()) return;
    setLoading(true);

    // Simulate AI processing time for UX consistency
    setTimeout(() => {
      // 1. Get Initials (e.g., "Nadun Dhananjaya" -> "ND")
      const words = prompt.trim().split(/\s+/);
      let letters = "";
      if (words.length >= 2) {
        letters = (words[0][0] + words[1][0]).toUpperCase();
      } else {
        letters = prompt.substring(0, 2).toUpperCase();
      }

      // 2. Derive deterministic random traits based on the prompt string
      const promptHash = Array.from(prompt).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const themeIndex = promptHash % gradients.length;
      const shapeIndex = promptHash % shapes.length;

      setLogoData({
        text: prompt,
        letters: letters,
        gradient: gradients[themeIndex],
        shape: shapes[shapeIndex],
      });
      
      setLoading(false);
    }, 1500);
  };

  const renderShapePath = (shapeStr: string) => {
    switch (shapeStr) {
      case "hexagon":
        return "M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z";
      case "circle":
        return "M100 20 A80 80 0 1 1 99.9 20";
      case "shield":
        return "M30 30 L100 15 L170 30 L170 90 C170 140 100 185 100 185 C100 185 30 140 30 90 Z";
      case "square":
        return "M30 30 L170 30 L170 170 L30 170 Z";
      default:
        return "M100 20 A80 80 0 1 1 99.9 20";
    }
  };

  const downloadLogo = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Create base64 SVG
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    
    img.onload = () => {
      // 800x800 resolution for High Res
      canvas.width = 800;
      canvas.height = 800;
      if (ctx) {
        // Draw with white background to give it a solid canvas
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 800, 800);
        ctx.drawImage(img, 100, 100, 600, 600); // Draw centered
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `Logo_${prompt.replace(/\s+/g, '_')}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        <Link href="/tools" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold mb-12 transition-all hover:-translate-x-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Tools Lab
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mb-6 shadow-lg shadow-pink-500/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 cyber-font cyber-glow text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
            Brand/Logo Builder Engine
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Type your brand name. Our engine will mathematically generate a highly professional vector lettermark logo combining typography and geometry.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.1 }}
          className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateLogo()}
              placeholder="E.g., Nadun Tech Solutions"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors text-lg"
            />
            <button
              onClick={generateLogo}
              disabled={loading || !prompt.trim()}
              className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                loading || !prompt.trim() ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Building...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Build Logo
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Output Section */}
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ delay: 0.2 }}
           className="flex justify-center"
        >
          {logoData && !loading ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative group w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-20" />
              
              <div className="bg-white border border-white/20 p-8 rounded-3xl relative z-10 flex flex-col items-center">
                
                {/* Dynamically generated SVG Logo */}
                <div className="w-[300px] h-[300px] flex items-center justify-center p-4">
                  <svg ref={svgRef} viewBox="0 0 200 250" className="w-full h-full drop-shadow-2xl overflow-visible">
                    <defs>
                      <linearGradient id={`grad-${logoData.gradient.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={logoData.gradient.start} />
                        <stop offset="100%" stopColor={logoData.gradient.end} />
                      </linearGradient>
                      {/* Drop shadow definition */}
                      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25"/>
                      </filter>
                    </defs>

                    {/* Vector Container Shape */}
                    <path 
                      d={renderShapePath(logoData.shape)} 
                      fill={`url(#grad-${logoData.gradient.id})`}
                      filter="url(#shadow)"
                    />
                    
                    {/* Inner Offset Stroke */}
                    <path 
                      d={renderShapePath(logoData.shape)} 
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeOpacity="0.3"
                      transform="scale(0.85) translate(18, 20)"
                    />

                    {/* Primary Lettermark Text */}
                    <text 
                      x="100" 
                      y="115" 
                      fontFamily="'Montserrat', 'Inter', sans-serif" 
                      fontWeight="900" 
                      fontSize="65" 
                      fill="#ffffff" 
                      textAnchor="middle" 
                      alignmentBaseline="middle"
                      letterSpacing="-2"
                    >
                      {logoData.letters}
                    </text>
                    
                    {/* Written Brand Text Below Shape */}
                    <text 
                      x="100" 
                      y="230" 
                      fontFamily="'Plus Jakarta Sans', sans-serif" 
                      fontWeight="800" 
                      fontSize="22" 
                      fill="#1f2937" 
                      textAnchor="middle"
                      letterSpacing="0.5"
                    >
                      {logoData.text.length > 20 ? logoData.text.substring(0, 20) + "..." : logoData.text}
                    </text>
                  </svg>
                </div>

                <button 
                  onClick={downloadLogo}
                  className="mt-8 w-full py-4 bg-gray-900 hover:bg-gray-800 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download High-Res Logo
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="w-full max-w-[400px] aspect-square rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-gray-500 bg-white/5 relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#09090b]/80 rounded-3xl z-20 backdrop-blur-sm">
                  <svg className="animate-spin h-10 w-10 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
              )}
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
              <p>Type your brand name above</p>
            </div>
          )}
        </motion.div>

      </div>
    </main>
  );
}
