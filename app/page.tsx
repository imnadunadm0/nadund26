"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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

  useEffect(() => {
    const saved = localStorage.getItem("cyber");
    if (saved) setCyber(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("cyber", String(cyber));
  }, [cyber]);

  /* Apple-style scroll effects */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const images = cyber ? cyberImages : normalImages;

  return (
    <main
      className={`min-h-screen transition-all duration-1000 relative ${
        cyber
          ? "bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className={`fixed top-0 left-0 z-50 h-1 w-full origin-left ${
          cyber ? "bg-pink-400" : "bg-indigo-600"
        }`}
      />

      {/* Soft parallax blob */}
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className={`pointer-events-none fixed -top-24 -right-24 z-0 h-[420px] w-[420px] rounded-full blur-3xl opacity-40 ${
          cyber ? "bg-pink-500" : "bg-indigo-300"
        }`}
      />

      {/* Theme toggle */}
     <button
  onClick={() => setCyber(!cyber)}
  className={`fixed top-3 right-3 z-50 
    px-3 py-1.5 text-xs sm:text-sm 
    rounded-full shadow-md font-medium 
    backdrop-blur-md transition 
    ${
      cyber
        ? "bg-pink-500/90 hover:bg-purple-500 text-white"
        : "bg-indigo-600/90 hover:bg-indigo-700 text-white"
    }
  `}
>
  {cyber ? "Normal" : "Cyber"}
</button>


      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto min-h-screen grid md:grid-cols-2 gap-12 items-center px-6">
        <Reveal className="space-y-6 text-center md:text-left">
          <h1 className={`text-4xl md:text-6xl font-bold ${cyber ? "text-pink-400" : ""}`}>
            Nadun Pasindu Dhananjaya
          </h1>

          <p className={cyber ? "text-purple-300" : "text-gray-500"}>
            aka Nadun ADM
          </p>

          <h2 className={cyber ? "text-purple-300 text-xl" : "text-indigo-600 text-xl"}>
            Computer Hardware & Network Technician
          </h2>

          <p className={cyber ? "text-purple-200" : "text-gray-700"}>
            I’m Nadun, a Computer Hardware and Network Technician passionate about
            systems, networking, AI, and creative problem-solving.
          </p>

          <p>📧 imnadunadm@gmail.com</p>
        </Reveal>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl overflow-hidden shadow-lg ${
                cyber ? "border border-purple-400" : ""
              }`}
            >
              <img src={src} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* LINKEDIN */}
      {/* LINKEDIN FEED SECTION */}
<section className="relative z-10 max-w-6xl mx-auto px-6 my-20">
  <Reveal>
    <div
      className={`p-6 md:p-8 rounded-2xl shadow-lg ${
        cyber
          ? "bg-purple-800/50 border border-purple-500/40"
          : "bg-white"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-2 ${
          cyber ? "text-pink-400" : ""
        }`}
      >
        LinkedIn Feed
      </h2>

      <p className={cyber ? "text-purple-200 mb-4" : "text-gray-600 mb-4"}>
        My professional profile and latest activity on LinkedIn.
      </p>

      {/* CLICKABLE PROFILE LINK */}
      <a
        href="https://www.linkedin.com/in/nadun-dhananjaya-3a4702296/"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full font-medium transition ${
          cyber
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Visit my LinkedIn Profile →
      </a>

      {/* OFFICIAL LINKEDIN FEED (BADGE) */}
      <div className="mt-6">
        <LinkedInBadge
          vanity="nadun-dhananjaya-3a4702296"
          theme={cyber ? "dark" : "light"}
        />
      </div>
    </div>
  </Reveal>
</section>
{/* CV DOWNLOAD */}
<section className="relative z-10 max-w-4xl mx-auto px-6 my-20">
  <Reveal>
    <div
      className={`p-8 rounded-2xl shadow-lg text-center ${
        cyber
          ? "bg-purple-800/50 border border-purple-500/40"
          : "bg-white"
      }`}
    >
      <h2 className={`text-3xl font-bold mb-3 ${cyber ? "text-pink-400" : ""}`}>
        Download My CV
      </h2>

      <p className={cyber ? "text-purple-200 mb-6" : "text-gray-600 mb-6"}>
        A quick overview of my skills, experience, and technical background.
      </p>

      <a
        href="/Nadun_CV.pdf"
        download
        className={`inline-block px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 ${
          cyber
            ? "bg-pink-500 hover:bg-purple-500 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        Download CV ↓
      </a>
    </div>
  </Reveal>
</section>



      {/* YOUTUBE PLAYLIST */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 my-20">
        <Reveal>
          <div className={`p-6 rounded-2xl shadow-lg ${
            cyber ? "bg-purple-800/50 border border-purple-500/40" : "bg-white"
          }`}>
            <h2 className={`text-3xl font-bold mb-4 ${cyber ? "text-pink-400" : ""}`}>
             AI RAP SONGS LYRICS BY ME
            </h2>

            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed?listType=playlist&list=PLIT7sCYKC00PQqzvbI-O0caw4H8yoPRPY"
                title="YouTube playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className={`text-center py-6 ${
        cyber ? "bg-purple-900 text-pink-400" : "bg-gray-100 text-gray-700"
      }`}>
        © 2026 Nadun ADM
      </footer>
    </main>
  );
}
