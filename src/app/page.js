import Image from "next/image";
import Navbar from "./components/Navbaar";
import Categories from "./components/Categories";
import WhyChooseUs from "./components/WhyChoose";
import PromoBanners from "./components/Banner";
import Testimonials from "./components/Testimonials";
import CategoryProducts from "./components/TabProducts";
import Footer from "./components/Footer";
import ProductCards from "./components/Main";
import Marquee from "./components/Marquee";
import BannerProduct from "./components/BannerProduct";
import Newbanner from "./components/NewBanner";
import Main from "./components/Main";
import Products from "./components/Products";


export default function Home() {
  return (
    <>
    <Main/>
 <Navbar/>
 <Products/>
 <Categories/>
 <ProductCards/>
 <PromoBanners/>
  <Marquee/>
 <BannerProduct/>
  <Newbanner/>
 <CategoryProducts/>

<WhyChooseUs/>
 <Testimonials/>
 <Footer/>

 

 </>
  );
}
