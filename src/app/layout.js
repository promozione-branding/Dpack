import Footer from "./components/Footer";
import Navbar from "./components/Navbaar";
import LenisScroll from "./components/Smooth";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

import { Urbanist, Work_Sans } from "next/font/google";

/* =========================================================
   FONTS
========================================================= */

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

/* =========================================================
   METADATA
========================================================= */

export const metadata = {
  title: "Dpack | Protective Packaging Solutions",
  description:
    "Dpack provides innovative protective packaging solutions including air column bags, dunnage bags, packaging air bags and gap fillers.",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${workSans.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <LenisScroll />

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}