import Image from "next/image";
import Navbar from "./components/Navbaar";
import Main from "./components/Main";
import ProductsSection from "./components/Products";
import BestSeller from "./components/BestSeller";
import Categories from "./components/Categories";
import Box from "./components/Box";
import VerticalSections from "./components/VerticleScroll";
import WhyChooseUs from "./components/WhyChoose";
import BulkCTA from "./components/BulkCta";
import PromoBanners from "./components/Banner";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/Faq";
import CategoryProducts from "./components/TabProducts";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
 <Navbar/>
 <Main/>
 
 <ProductsSection/>
 <Categories/>
 <PromoBanners/>
 <CategoryProducts/>
 <WhyChooseUs/>
{/* <BestSeller/> */}
 <Testimonials/>
 <FAQSection/>
 <Footer/>
 {/* <BulkCTA/> */}
 {/* <VerticalSections/> */}
 

 </>
  );
}
