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
  verification: {
    google: "HVXcRkauSMMisCiVEB1UOgYhrw-j8-i71zh5zOc4pNI",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dpackshop.com/#organization",
      name: "Dpack",
      url: "https://dpackshop.com/",
      description:
        "Dpack offers protective packaging, cargo securing and industrial packaging solutions for businesses, logistics, warehousing and e-commerce.",
      email: "info@dpacksolutions.com",
      knowsAbout: [
        "Protective Packaging",
        "Air Column Bags",
        "Air Cushion Packaging",
        "Dunnage Bags",
        "Honeycomb Paper Packaging",
        "Cargo Securing Products",
        "Packaging Machines",
        "Lashing Belts",
        "Packaging Tapes",
        "Industrial Packaging",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://dpackshop.com/#website",
      url: "https://dpackshop.com/",
      name: "Dpack Shop",
      publisher: {
        "@id": "https://dpackshop.com/#organization",
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": "https://dpackshop.com/#webpage",
      url: "https://dpackshop.com/",
      name: "Dpack - Protective Packaging Solutions",
      description:
        "Shop protective packaging products, air bags, air column rolls, gap fillers, cargo securing products and industrial packaging solutions.",
      isPartOf: {
        "@id": "https://dpackshop.com/#website",
      },
      about: {
        "@id": "https://dpackshop.com/#organization",
      },
    },
  ],
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
      <head>
        <link rel="canonical" href="https://dpackshop.com/"></link>
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-M5JCKR4F"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());",
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18166665273"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18166665273');",
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SNGVTX6F4H"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-SNGVTX6F4H');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
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