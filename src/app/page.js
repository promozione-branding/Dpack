import TrendingProducts from "@/components/Products";
import Clientele from "./cart/Clientele";
import SaleNow from "@/components/SaleNow";
import Product360 from "@/components/Products360";
import Categories from "@/components/Categories";
import VideoSection from "@/components/Video";
import PromoBanners from "@/components/Banner";
import CategoryMarquee from "@/components/CategoryMarquee";
import BannerProduct from "@/components/BannerProduct";
import Newbanner from "@/components/NewBanner";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import Cartificat from "@/components/Catificate";
import WhyChooseUs from "@/components/WhyChoose";
import Main from "@/components/Box";
 import Highlight from "@/components/Highlight";



export default function Home() {
  return (
   
    <> 
    <Main/>
{/* <BestSellingProducts/> */}
 <TrendingProducts/>
   <Highlight/> 
   <VideoSection/> 
 <SaleNow/>
 <Product360/>
 <Categories/>
 <Clientele/>
 <Cartificat />
 <PromoBanners/>
  <CategoryMarquee/>
 
  <Newbanner/>
  <BannerProduct/>
  <CategoryMarquee/>
  <WhyChooseUs/>
 <Testimonials/>
</>
  );
}
