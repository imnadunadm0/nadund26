"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.8 }}
        className="text-xl font-semibold tracking-wide"
      >
        Nadun ADM
      </motion.div>
    </motion.div>
  );
}
