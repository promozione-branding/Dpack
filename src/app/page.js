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
import BestSellingProducts from "./components/BulkCta";
import SaleNow from "./components/SaleNow";
import CategoryMarquee from "./components/CategoryMarquee";


export default function Home() {
  return (
    <>
  
    {/* <Main/> */}
    <PackagingBanner/>
{/* <BestSellingProducts/> */}
 <Products/>
 <SaleNow/>
 <Categories/>
 {/* <ProductCards/> */}
 <PromoBanners/>
  <CategoryMarquee/>
 <BannerProduct/>
  <Newbanner/>
 <CategoryProducts/>

<WhyChooseUs/>
<Marquee/>
 <Testimonials/>


 

 </>
  );
}
