"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "./components/Reveal";
import LinkedInBadge from "./components/LinkedInBadge";

const normalImages = [
  "/images/photo5.jpeg",
  "/images/photo2.jpeg",
  "/images/photo3.jpeg",
  "/images/photo4.jpeg",
];

const cyberImages = [
  "/images/ai2.png",
  "/images/ai.png",
  "/images/ai3.png",
  "/images/ai4.png",
];

export default function Home() {
  const [cyber, setCyber] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyber");
    if (saved) setCyber(saved === "true");
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cyber", String(cyber));
    }
  }, [cyber, mounted]);

  /* Apple-style smooth scroll progress */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  /* Parallax Elements */
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const images = cyber ? cyberImages : normalImages;

  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120 } }
  };

  if (!mounted) return null;

  return (
    <main
      className={`min-h-screen transition-all duration-1000 relative overflow-hidden ${
        cyber
          ? "bg-[#09090b] text-white"
          : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX: progress }}
        className={`fixed top-0 left-0 z-50 h-[3px] w-full origin-left ${
          cyber ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gradient-to-r from-blue-600 to-indigo-600"
        }`}
      />

      {/* Background Animated Blobs */}
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className={`pointer-events-none fixed -top-32 -right-32 z-0 h-[600px] w-[600px] rounded-full blur-[100px] opacity-[0.15] ${
          cyber ? "bg-fuchsia-600" : "bg-blue-400"
        }`}
      />
      <motion.div
        aria-hidden
        style={{ y: blobY2 }}
        className={`pointer-events-none fixed top-1/2 -left-32 z-0 h-[500px] w-[500px] rounded-full blur-[100px] opacity-[0.15] ${
          cyber ? "bg-purple-700" : "bg-indigo-300"
        }`}
      />

      {/* Cyber/Normal Toggle Switch */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCyber(!cyber)}
        className={`fixed top-6 right-6 z-50 px-5 py-2 text-sm md:text-base font-semibold rounded-full shadow-xl backdrop-blur-md transition-all border ${
          cyber
            ? "bg-black/50 border-purple-500/30 text-pink-400 hover:bg-black/70 hover:border-pink-500 shadow-purple-900/20 cyber-font"
            : "bg-white/70 border-gray-200 text-indigo-700 hover:bg-white hover:shadow-2xl shadow-indigo-500/10"
        }`}
      >
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-pulse ${cyber ? "bg-pink-500" : "bg-indigo-500"}`}></span>
          {cyber ? "CYBER MODE" : "MODERN MODE"}
        </span>
      </motion.button>

      {/* ======================= HERO SECTION ======================= */}
      <section className="relative z-10 max-w-7xl mx-auto min-h-[90vh] flex items-center px-6 md:px-12 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Hero Content */}
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm tracking-wider font-semibold uppercase ${
                cyber ? "bg-purple-900/30 text-pink-400 border border-purple-500/20" : "bg-indigo-100 text-indigo-700"
              }`}>
                {cyber ? "SYSTEM ONLINE // NADUN ADM" : "Welcome to my portfolio"}
              </span>
              <h1 className={`text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] ${
                cyber ? "cyber-font text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 cyber-glow" : "text-gray-900"
              }`}>
                Nadun Pasindu<br />Dhananjaya
              </h1>
            </motion.div>

            <motion.h2 variants={itemVariants} className={`text-2xl font-medium ${
              cyber ? "text-purple-300" : "text-gray-600"
            }`}>
              Computer Hardware & <span className={cyber ? "text-pink-400" : "text-indigo-600"}>Network Technician</span>
            </motion.h2>

            <motion.p variants={itemVariants} className={`text-lg leading-relaxed max-w-xl ${
              cyber ? "text-gray-400" : "text-gray-600"
            }`}>
              Passionate about building robust systems, advanced networking, and solving complex hardware challenges. Transforming creative problems into elegant technological solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className={`px-8 py-3.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                cyber ? "bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30"
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Contact Me
              </a>
              <a href="#skills" className={`px-8 py-3.5 rounded-full font-semibold transition-all border ${
                cyber ? "border-purple-500/50 hover:bg-purple-900/30 text-purple-300" : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}>
                View Skills
              </a>
              <a href="/tools" className={`px-8 py-3.5 rounded-full font-bold transition-all flex items-center gap-2 ${
                cyber ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(192,38,211,0.4)]" : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-cyan-500/30"
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                My Tools
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 md:gap-6 relative z-10"
          >
            {images.map((src, i) => (
              <motion.div
                key={src}
                whileHover={{ scale: 1.03, y: -5, rotate: i % 2 === 0 ? 1 : -1 }}
                className={`rounded-2xl overflow-hidden aspect-[4/5] shadow-xl ${
                  cyber ? "border border-purple-500/30 glass-dark" : "bg-white"
                } ${i === 1 ? 'mt-8 md:mt-12' : ''} ${i === 3 ? 'mt-8 md:mt-12' : ''}`}
              >
                <motion.img 
                  initial={{ filter: 'grayscale(30%)' }}
                  whileHover={{ filter: 'grayscale(0%)' }}
                  src={src} 
                  alt={`Nadun ADM ${i + 1}`} 
                  className="w-full h-full object-cover transition-all duration-700" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======================= EXPERTISE SECTION ======================= */}
      <section id="skills" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <Reveal>
          <div className="mb-16 text-center md:text-left">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${cyber ? "cyber-font text-pink-400 cyber-glow" : "text-gray-900"}`}>
              Technical Expertise
            </h2>
            <p className={`text-lg max-w-2xl ${cyber ? "text-gray-400" : "text-gray-600"}`}>
              Specialized in combining hardware repair techniques with modern networking principles to create resilient technological environments.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Hardware Troubleshooting",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
              desc: "Deep knowledge in motherboard repair, component-level diagnostics, and systems assembly.",
            },
            {
              title: "Network Administration",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
              desc: "LAN/WAN configuration, routing, switching, and secure network infrastructure deployments.",
            },
            {
              title: "Tech Support & Solutions",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />,
              desc: "Providing swift, reliable IT support, OS installations, and tech problem-solving for enterprise and personal clients.",
            }
          ].map((skill, i) => (
            <Reveal key={i} delay={i * 0.2}>
              <motion.div 
                whileHover={{ y: -8 }}
                className={`p-8 rounded-3xl h-full transition-all duration-300 ${
                  cyber ? "glass-dark border border-purple-500/20 hover:border-pink-500/50 hover:shadow-[0_10px_30px_rgba(236,72,153,0.15)]" : "bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl border border-gray-100"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
                  cyber ? "bg-purple-900/50 text-pink-400" : "bg-indigo-50 text-indigo-600"
                }`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {skill.icon}
                  </svg>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${cyber ? "text-white" : "text-gray-900"}`}>{skill.title}</h3>
                <p className={`leading-relaxed ${cyber ? "text-purple-200/70" : "text-gray-600"}`}>{skill.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ======================= LINKEDIN & CV SECTION ======================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* LINKEDIN */}
          <Reveal>
            <div className={`p-10 rounded-3xl h-full flex flex-col justify-center transition-all ${
              cyber ? "glass border border-blue-500/30 hover:border-blue-400/50" : "bg-white shadow-xl shadow-blue-900/5 border border-blue-50"
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <h2 className={`text-3xl font-bold ${cyber ? "text-white" : "text-gray-900"}`}>
                  Professional Feed
                </h2>
              </div>
              <p className={`mb-8 text-lg ${cyber ? "text-gray-300" : "text-gray-600"}`}>
                Stay updated with my latest professional insights, certifications, and networking activities.
              </p>
              
              <div className="mb-8">
                <LinkedInBadge vanity="nadun-dhananjaya-3a4702296" theme={cyber ? "dark" : "light"} />
              </div>
              
              <a
                href="https://www.linkedin.com/in/nadun-dhananjaya-3a4702296/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all group ${
                  cyber ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Connect on LinkedIn
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </Reveal>

          {/* CV DOWNLOAD */}
          <Reveal delay={0.2}>
            <div className={`p-10 rounded-3xl h-full flex flex-col justify-center transition-all relative overflow-hidden group ${
              cyber ? "glass border border-pink-500/30 hover:border-pink-400/50" : "bg-white shadow-xl shadow-indigo-900/5 border border-indigo-50"
            }`}>
              {/* Decorative circle */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 transition-all duration-700 group-hover:scale-150 ${
                cyber ? "bg-pink-500" : "bg-indigo-500"
              }`} />
              
              <h2 className={`text-3xl font-bold mb-4 relative z-10 ${cyber ? "text-pink-400" : "text-indigo-600"}`}>
                Resume & Profile
              </h2>
              <p className={`text-lg mb-10 relative z-10 ${cyber ? "text-gray-300" : "text-gray-600"}`}>
                Download my comprehensive Curriculum Vitae to see a detailed overview of my experience, technical skills, and educational background.
              </p>
              
              <div className="flex-1 rounded-2xl border-2 border-dashed flex items-center justify-center p-8 mb-8 relative z-10 transition-colors duration-300 group-hover:border-solid
                border-gray-300 dark:border-gray-700">
                <div className="text-center">
                  <svg className={`w-16 h-16 mx-auto mb-4 ${cyber ? "text-pink-400/50" : "text-indigo-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <p className="font-semibold text-xl">Nadun_CV.pdf</p>
                  <p className="text-sm opacity-60">PDF Document • 1.2 MB</p>
                </div>
              </div>

              <a
                href="/Nadun_CV.pdf"
                download
                className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all relative z-10 group-hover:shadow-2xl ${
                  cyber ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download CV
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================= YOUTUBE PLAYLIST & ENTERTAINMENT ======================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 pb-32">
        <Reveal>
          <div className={`p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl transition-all ${
            cyber ? "border-2 border-fuchsia-500/30 bg-black/40 backdrop-blur-xl" : "bg-white border-none"
          }`}>
            <div className={`absolute inset-0 opacity-20 ${
              cyber ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900 via-transparent to-transparent" : "bg-gradient-to-br from-red-50 to-orange-50"
            }`} />
            
            <div className="relative z-10 max-w-3xl mb-12">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase mb-4 ${
                cyber ? "bg-red-900/30 text-red-400 border border-red-500/30" : "bg-red-100 text-red-600"
              }`}>
                Creative Outlet
              </span>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${cyber ? "text-white" : "text-gray-900"}`}>
                AI Rap Songs <span className={cyber ? "text-fuchsia-400" : "text-red-500"}>Lyrics By Me</span>
              </h2>
              <p className={`text-lg ${cyber ? "text-gray-300" : "text-gray-600"}`}>
                Merging my technical side with creativity. Listen to some tracks where I explore AI-generated music combined with my custom lyrics.
              </p>
            </div>

            <div className={`aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-[1.01] ${
              cyber ? "ring-2 ring-fuchsia-500/40 shadow-fuchsia-900/30" : "ring-1 ring-gray-200"
            }`}>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed?listType=playlist&list=PLIT7sCYKC00PQqzvbI-O0caw4H8yoPRPY"
                title="Nadun's AI Rap Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer id="contact" className={`relative border-t py-12 px-6 ${
        cyber ? "bg-[#09090b] border-purple-900/50" : "bg-gray-50 border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className={`text-2xl font-bold tracking-tighter ${cyber ? "cyber-font text-white" : "text-gray-900"}`}>
              NADUN <span className={cyber ? "text-pink-500" : "text-indigo-600"}>ADM</span>
            </h3>
            <p className={`mt-2 ${cyber ? "text-gray-500" : "text-gray-500"}`}>
              Computer Hardware & Network Technician
            </p>
          </div>
          
          <div className={`flex items-center gap-6 ${cyber ? "text-gray-400" : "text-gray-600"}`}>
            <a href="mailto:imnadunadm@gmail.com" className="hover:text-indigo-500 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              imnadunadm@gmail.com
            </a>
          </div>
        </div>
        <div className={`text-center mt-12 pt-8 border-t text-sm ${cyber ? "border-purple-900/30 text-gray-600" : "border-gray-200 text-gray-400"}`}>
          © {new Date().getFullYear()} Nadun Pasindu Dhananjaya. All rights reserved. Built with Next.js & Framer Motion.
        </div>
      </footer>
    </main>
  );
}
