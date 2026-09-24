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
import ProductCards from "./components/Main";
import Marquee from "./components/Marquee";
import BannerProduct from "./components/BannerProduct";
import Newbanner from "./components/NewBanner";


export default function Home() {
  return (
    <>
 <Navbar/>
 <Main/>
 <ProductsSection/>
 <Categories/>
 <ProductCards/>
 <PromoBanners/>
  <Marquee/>
 <BannerProduct/>
  <Newbanner/>
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
