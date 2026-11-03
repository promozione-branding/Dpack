import Navbar from "@/components/Navbaar";

import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

import { Urbanist, Work_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import LenisScroll from "@/components/Smooth";


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
  title: "Inflatable Packaging Manufacturer & Importer | D Pack",
  description: "D Pack is a trusted manufacturer and importer of Air Cushion Bags, Dunnage Air Bags, Air Column Bags and inflatable packaging solutions.",
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
          <LenisScroll>
            <main className="flex-1">
              {children}
            </main>
          </LenisScroll>

          <Footer />
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}