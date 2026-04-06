"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const tools = [
  {
    id: "logo-creator",
    title: "AI Logo Creator",
    description: "Generate professional logos instantly using AI algorithms and custom typography models.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
    link: "/tools/logo-creator" 
  },
  {
    id: "film-portal",
    title: "Film Portal",
    description: "Access my secure, private streaming portal to watch the latest films and videos in high quality.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
    link: "/tools/film-portal"
  },
  {
    id: "live-tv",
    title: "Live TV Streaming",
    description: "Catch up with global live TV channels, news, and sports broadcasting directly here.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-purple-500 to-indigo-500",
    shadow: "shadow-purple-500/20",
    link: "#live-tv"
  }
];

export default function ToolsHub() {
  const [cyber, setCyber] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyber");
    if (saved) setCyber(saved === "true");
  }, []);

  if (!mounted) return null;

  return (
    <main className={`min-h-screen transition-all duration-1000 ${
      cyber ? "bg-[#09090b] text-white" : "bg-[#f8fafc] text-gray-900"
    }`}>
      
      {/* Background Orbs */}
      <div className={`fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0`}>
        <div className={`absolute -top-[20%] -left-[10%] w-[700px] h-[700px] rounded-full blur-[120px] opacity-20 ${cyber ? "bg-fuchsia-600" : "bg-blue-300"}`} />
        <div className={`absolute top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 ${cyber ? "bg-purple-700" : "bg-indigo-200"}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        
        {/* Navigation / Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-20"
        >
          <Link href="/" className={`flex items-center gap-2 font-semibold transition-all hover:-translate-x-2 ${
            cyber ? "text-pink-400 hover:text-pink-300" : "text-indigo-600 hover:text-indigo-500"
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>

          <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest ${
            cyber ? "border border-purple-500/50 bg-purple-900/20 text-purple-300 cyber-font" : "bg-indigo-100 text-indigo-700"
          }`}>
            NADUN'S LAB
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center md:text-left mb-16"
        >
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 tracking-tight ${
            cyber ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 cyber-glow cyber-font" : "text-gray-900"
          }`}>
            Tools & Portals
          </h1>
          <p className={`text-xl max-w-2xl ${cyber ? "text-gray-400" : "text-gray-600"}`}>
            Welcome to the laboratory. Access my custom-built applications, media portals, and creative generators all in one place.
          </p>
        </motion.div>

        {/* Grid of Tools */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tools.map((tool, i) => (
            <motion.a
              key={tool.id}
              href={tool.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`block relative group overflow-hidden rounded-3xl p-8 transition-all duration-300 shadow-xl ${
                cyber 
                  ? "bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-pink-500/50" 
                  : "bg-white border border-gray-100 hover:shadow-2xl"
              } ${tool.shadow}`}
            >
              {/* Gradient hover background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${tool.color}`} />
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br ${tool.color} shadow-lg relative z-10`}>
                {tool.icon}
              </div>

              <h2 className={`text-2xl font-bold mb-3 relative z-10 ${cyber ? "text-white" : "text-gray-900"}`}>
                {tool.title}
              </h2>
              
              <p className={`relative z-10 leading-relaxed ${cyber ? "text-gray-400" : "text-gray-600"}`}>
                {tool.description}
              </p>

              <div className={`mt-8 inline-flex items-center gap-2 font-semibold transition-all relative z-10 ${
                cyber ? "text-pink-400 group-hover:text-pink-300" : "text-indigo-600 group-hover:text-indigo-700"
              }`}>
                Launch App
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
