"use client";

import { useEffect, useState } from "react";

/* ---------- IMAGE SETS ---------- */
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

  const images = cyber ? cyberImages : normalImages;

  /* Load theme */
  useEffect(() => {
    const saved = localStorage.getItem("cyber");
    if (saved) setCyber(saved === "true");
  }, []);

  /* Save theme */
  useEffect(() => {
    localStorage.setItem("cyber", String(cyber));
  }, [cyber]);

  return (
    <main
      className={`min-h-screen transition-all duration-1000 ${
        cyber
          ? "bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      {/* THEME TOGGLE */}
      <button
        onClick={() => setCyber(!cyber)}
        className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full font-medium shadow-md transition ${
          cyber
            ? "bg-pink-500 hover:bg-purple-500 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {cyber ? "Normal Theme" : "Cyberpunk Mode"}
      </button>

      {/* HERO */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen px-6">
        {/* LEFT */}
        <div className="space-y-6 text-center md:text-left">
          <h1
            className={`text-4xl md:text-6xl font-bold ${
              cyber ? "text-pink-400 cyber-font cyber-glow" : ""
            }`}
          >
            Nadun Pasindu Dhananjaya
          </h1>

          <p className={cyber ? "text-purple-300 cyber-font" : "text-gray-500"}>
            aka Nadun ADM
          </p>

          <h2
            className={`text-xl md:text-2xl ${
              cyber ? "text-purple-400 cyber-font" : "text-indigo-600"
            }`}
          >
            Computer Hardware & Network Technician
          </h2>

          <p
            className={`text-lg leading-relaxed ${
              cyber ? "text-purple-200 cyber-font" : "text-gray-700"
            }`}
          >
            I’m Nadun, a Computer Hardware and Network Technician with a passion
            for technology, systems, and creative problem-solving.
            <br />
            <br />
            I work across hardware, networking, web development, AI, automation,
            psychology, and marketing.
          </p>

          <p className={cyber ? "text-purple-300" : "text-gray-600"}>
            📧 imnadunadm@gmail.com
          </p>
        </div>

        {/* RIGHT – IMAGE GRID */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden transition duration-500 hover:scale-105 ${
                cyber
                  ? "border border-purple-400 shadow-lg shadow-pink-500/50"
                  : "shadow-lg"
              }`}
            >
              <img
                src={src}
                alt={`photo ${i + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <section className="max-w-6xl mx-auto px-6 my-16">
        <h2 className={`text-3xl font-bold mb-6 ${cyber ? "text-pink-400" : ""}`}>
          My Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            "Computer Hardware",
            "Networking",
            "Web Development",
            "AI & Automation",
            "CCTV Systems",
            "Marketing",
            "Creative Writing",
            "Communication",
          ].map((skill, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl text-center font-medium transition hover:scale-105 ${
                cyber
                  ? "bg-purple-800 text-purple-200 shadow-pink-500/40 shadow-lg"
                  : "bg-gray-100 shadow-md"
              }`}
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* CV */}
      <section className="text-center my-16">
        <h2 className={`text-3xl font-bold mb-6 ${cyber ? "text-pink-400" : ""}`}>
          Download My CV
        </h2>

        <a
          href="/Nadun_Pasindu_Dhananjaya_CV.pdf"
          download
          className={`inline-block px-6 py-3 rounded-full font-medium shadow-lg transition ${
            cyber
              ? "bg-purple-700 hover:bg-pink-500 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          Download CV
        </a>
      </section>

      {/* 🎥 YOUTUBE PLAYLIST PLAYER */}
      <div className="max-w-4xl mx-auto my-20 aspect-video rounded-2xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed?listType=playlist&list=PLIT7sCYKC00PQqzvbI-O0caw4H8yoPRPY&si=UexRCqvThzkkvxo8"
          title="YouTube playlist player"
          allowFullScreen
        ></iframe>
      </div>

      {/* FLOATING CONTACT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/94759080516"
          target="_blank"
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg"
        >
          WhatsApp
        </a>

        <a
          href="https://www.youtube.com/@nadunadm"
          target="_blank"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-lg"
        >
          YouTube
        </a>
      </div>

      {/* FOOTER */}
      <footer
        className={`py-6 text-center mt-20 ${
          cyber ? "bg-purple-900 text-pink-400" : "bg-gray-100 text-gray-700"
        }`}
      >
        © 2026 Nadun ADM — Computer Hardware & Network Technician.
      </footer>
    </main>
  );
}
