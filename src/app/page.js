import dynamic from "next/dynamic";

import PackagingBanner from "./components/Box";
import Clientele from "./cart/Clientele";
import Catificate from "./components/Catificate";
import LenisScroll from "./components/Smooth";


const Products = dynamic(() => import("./components/Products"));
const SaleNow = dynamic(() => import("./components/SaleNow"));
const Product360 = dynamic(() => import("./components/Products360"));
const Categories = dynamic(() => import("./components/Categories"));
const VideoSection = dynamic(() => import("./components/Video"));
const PromoBanners = dynamic(() => import("./components/Banner"));
const CategoryMarquee = dynamic(() => import("./components/CategoryMarquee"));
const BannerProduct = dynamic(() => import("./components/BannerProduct"));
const Newbanner = dynamic(() => import("./components/NewBanner"));
const CategoryProducts = dynamic(() => import("./components/TabProducts"));
const WhyChooseUs = dynamic(() => import("./components/WhyChoose"));
const Marquee = dynamic(() => import("./components/Marquee"));
const Testimonials = dynamic(() => import("./components/Testimonials"));


export default function Home() {
  return (
   
    <>
  
 
    <PackagingBanner/>
{/* <BestSellingProducts/> */}
 <Products/>
 
 <SaleNow/>
 <Product360/>
 <Categories/>
 <Clientele/>
 
 <VideoSection/> 
 <Catificate/>
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
