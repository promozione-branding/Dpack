import Image from "next/image";

import Categories from "./components/Categories";
import WhyChooseUs from "./components/WhyChoose";
import PromoBanners from "./components/Banner";
import Testimonials from "./components/Testimonials";
import CategoryProducts from "./components/TabProducts";

import Marquee from "./components/Marquee";
import BannerProduct from "./components/BannerProduct";
import Newbanner from "./components/NewBanner";

import Products from "./components/Products";
import PackagingBanner from "./components/Box";
import SaleNow from "./components/SaleNow";
import CategoryMarquee from "./components/CategoryMarquee";
import VideoSection from "./components/Video";



export default function Home() {
  return (
    <>
  
 
    <PackagingBanner/>
{/* <BestSellingProducts/> */}
 <Products/>
 <SaleNow/>
 <Categories/>
 <VideoSection/> 
 <PromoBanners/>
  <CategoryMarquee/>
 <BannerProduct/>
  <Newbanner/>
 <CategoryProducts/>

<WhyChooseUs/>
{/* <ProductEditorial/> */}
<Marquee/>
 <Testimonials/>


 

 </>
  );
}
