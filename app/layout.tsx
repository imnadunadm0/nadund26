export const metadata = {
  title: "Nadun Pasindu Dhananjaya | Hardware & Network Technician",
  description:
    "Portfolio of Nadun Pasindu Dhananjaya (Nadun ADM) – Computer Hardware & Network Technician with interest in AI, systems, and modern web technologies.",
  keywords: [
    "Nadun Dhananjaya",
    "Nadun ADM",
    "IT Support Sri Lanka",
    "Computer Hardware Technician",
    "Network Technician",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Nadun Pasindu Dhananjaya" }],
  openGraph: {
    title: "Nadun ADM – IT & Network Technician",
    description:
      "Explore the portfolio, CV, and projects of Nadun ADM.",
    url: "https://your-vercel-url.vercel.app",
    siteName: "Nadun ADM Portfolio",
    images: [
      {
        url: "/images/photo5.jpeg",
        width: 1200,
        height: 630,
        alt: "Nadun ADM Portfolio",
      },
    ],
    type: "website",
  },
};

import "./globals.css";
import { PropsWithChildren } from "react";
import Preloader from "./components/Preloader";
import FloatingAudio from "./components/FloatingAudio";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 transition-colors duration-500 selection:bg-indigo-500 selection:text-white">
        <Preloader />
        <FloatingAudio />
        {children}
      </body>
    </html>
  );
}
