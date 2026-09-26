import Footer from "./components/Footer";
import Navbar from "./components/Navbaar";
import LenisScroll from "./components/Smooth";
import "./globals.css";

import { Outfit, Quicksand } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "Dpack | Protective Packaging Solutions",
  description:
    "Dpack provides innovative protective packaging solutions including air column bags, dunnage bags, packaging air bags and gap fillers.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${quicksand.variable}`}
    >
      <body className="min-h-screen flex flex-col">

        {/* HEADER */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        {/* SMOOTH SCROLL */}
        <LenisScroll />

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}