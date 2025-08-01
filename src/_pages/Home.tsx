import { ArrowRight, Instagram } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";

import KidCategory from "@/assets/kid.png";
// import Men from "@/assets/men.png";
import Women from "@/assets/women.png";
import WomenClctn from "@/assets/women-crop.png";
import Men from "@/assets/men-bg-2.png";

import Prev from "@/assets/prev.png";
import Prevglasses from "@/assets/prev-glasses.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import insta1 from "@/assets/insta/img-1.jpg";
import insta2 from "@/assets/insta/img2.jpg";
import insta3 from "@/assets/insta/img3.jpg";
import insta4 from "@/assets/insta/img4.jpg";
import insta5 from "@/assets/insta/img5.jpg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import ProductSection from "@/components/home/ProductSection";

const Home = () => {
  return (
    <>
      {/* herro section */}
      <section className="w-full overflow-hidden wrapper">
        <div className="w-full flex flex-col md:flex-row items-center justify-between rounded-2xl relative overflow-hidden">
          <span className="gradient "></span>
          <div className="relative z-10 pt-12 px-5 lg:pe-0 md:ps-12 md:pt-0 text-center w-full mb-4 lg:mb-0 md:text-start col-span-5">
            <p className="mb-4 lg:mb-6 text-base lg:text-xl">
              The new stylish collection
            </p>
            <h1 className="text-4xl lg:text-6xl font-semibold mb-4 lg:mb-6">
              NEW FALL <span className="block">SEASON 2025</span>
            </h1>
            <button className="text-base font-medium lg:text-lg hover:bg-foreground/90 ease-in duration-300  group bg-foreground text-primary-foreground px-4 py-3 rounded-lg">
              Shop Now
              <ArrowRight className="size-5 lg:size-6 group-hover:translate-x-1 easy-in duration-300 inline ms-2" />
            </button>
          </div>
          <div className="aspect-[648/636] max-w-[636px] w-full relative z-10 ">
            <img src={Women} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* category */}
      <section className="mt-4 w-full wrapper">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          // navigation
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          className="my-swiper"
        >
          {/* men collection */}
          <SwiperSlide>
            {" "}
            <div className="w-full  flex rounded-lg overflow-hidden hover:shadow-sm relative h-full group">
              <div className="p-6 relative z-10  w-full flex flex-col justify-between">
                <div>
                  <div className="text-lg font-semibold sm:text-base lg:text-lg">
                    Men's Wear
                  </div>
                  <p className="text-xs sm:text-sm mt-1 line-clamp-2 ">
                    Style meets comfort for every day
                  </p>
                </div>
                <div className="w-fit relative text-sm lg:text-base">
                  <Link to={"#"} className="block">
                    See More
                  </Link>
                  <div className="h-[1px] w-full bg-primary scale-0 group-hover:scale-100 transition-all duration-300"></div>
                </div>
              </div>
              <div className="max-w-[220px] lg:max-w-[220px] flex items-end w-full aspect-[326/227] relative z-10 ">
                <img src={Men} className="object-contain " />
              </div>
              {/* bg */}
              <div className="w-full h-full absolute bg-gradient-blue"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full  flex rounded-lg overflow-hidden hover:shadow-sm relative h-full group ">
              <div className="p-6  relative z-10  w-full flex flex-col justify-between">
                <div>
                  <div className="text-lg font-semibold sm:text-base lg:text-lg relative ">
                    Women's Wear
                  </div>
                  <p className="text-xs sm:text-sm mt-1 line-clamp-2 ">
                    Chic looks for any occasion
                  </p>
                </div>

                <div className="w-fit relative text-sm lg:text-base">
                  <Link to={"#"} className="block">
                    See More
                  </Link>
                  <div className="h-[1px] w-full bg-primary scale-0 group-hover:scale-100 transition-all duration-300"></div>
                </div>
              </div>
              <div className="max-w-[220px] lg:max-w-[220px] flex items-end w-full aspect-[305/220] relative z-10 ">
                <img src={WomenClctn} className="object-contain " />
              </div>
              {/* bg */}
              <div className="w-full h-full absolute bg-gradient-pink"></div>
            </div>
          </SwiperSlide>

          {/* kid collection */}
          <SwiperSlide>
            <div className="w-full  flex rounded-lg overflow-hidden hover:shadow-sm relative h-full group">
              <div className="p-6 relative z-10  w-full flex flex-col justify-between">
                <div>
                  <div className="text-lg font-semibold sm:text-base lg:text-lg">
                    Kids's Wear
                  </div>
                  <p className="text-xs sm:text-sm mt-1 line-clamp-2 ">
                    Cute and comfy outfits for little ones
                  </p>
                </div>
                <div className="w-fit relative text-sm lg:text-base">
                  <Link to={"#"} className="block">
                    See More
                  </Link>
                  <div className="h-[1px] w-full bg-primary scale-0 group-hover:scale-100 transition-all duration-300"></div>
                </div>
              </div>
              <div className="max-w-[220px] lg:max-w-[220px] flex items-end w-full aspect-[305/220] relative z-10 ">
                <img src={KidCategory} className="object-cover " />
              </div>
              {/* bg */}
              <div className="w-full h-full absolute bg-gradient-green"></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* product */}
      <ProductSection />

      {/* offerr */}
      <section className="pt-24 w-full wrapper ">
        <h1 className="text-4xl font-medium text-center mb-8">
          Special offer for you
        </h1>
        <div className="bg-[#dceee7] dark:bg-[#1b282c] flex flex-col-reverse lg:flex-row items-center rounded-lg pt-6">
          <div className="col-span-4  ">
            <img src={Prev} alt="" />
          </div>

          <div className="col-span-3 px-6">
            <Card className="flex flex-col items-center">
              <div className="w-[70%] ">
                <img src={Prevglasses} />
              </div>
              <div>
                <div className=" text-sm">Polarized sunglasses for men</div>
                <div className="flex gap-2 items-center mt-1 justify-center text-sm">
                  <div className="text-lg font-semibold">Rp. 126.500</div>
                  <div className="text-sm line-through text-muted-foreground">
                    Rp. 155.000
                  </div>
                </div>
              </div>
              <Button className="align-middle">Shop Now</Button>

              <div className="mt-2 flex gap-4 items-center">
                <div className="bg-primary text-secondary px-4 py-2 text-sm rounded-md">
                  7d
                </div>
                <div className="bg-primary text-secondary px-4 py-2 text-sm rounded-md">
                  13h
                </div>
                <div className="bg-primary text-secondary px-4 py-2 text-sm rounded-md">
                  51m
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* inspiration */}
      <section className="pt-24 wrapper w-full ">
        <h4 className="text-2xl lg:text-3xl font-semibold text-center">
          #bazario
        </h4>
        <p className="text-center  text-muted-foreground mt-2">
          Find more inspiration on our Instagram
        </p>
        {/* <ScrollAreaHorizontalDemo /> */}
        <ScrollArea className="whitespace-nowrap mt-2">
          <div className="flex gap-4 py-4">
            <Link to={"#"} className="shrink-0 overflow-hidden  group relative">
              <img
                src={insta1}
                width={220}
                height={220}
                className="aspect-square object-cover object-center group-hover:scale-105 ease-in duration-300"
              />
              <span className="w-full h-full absolute top-0  bg-black/0 group-hover:bg-black/20 ease-in duration-300 flex flex-col items-center justify-center">
                <Instagram className="text-white size-7 opacity-0 group-hover:opacity-100 ease-in duration-300 " />
              </span>
            </Link>
            <Link to={"#"} className="shrink-0 overflow-hidden  group relative">
              <img
                src={insta2}
                width={220}
                height={220}
                className="aspect-square object-cover object-center group-hover:scale-105 ease-in duration-300"
              />
              <span className="w-full h-full absolute top-0  bg-black/0 group-hover:bg-black/20 ease-in duration-300 flex flex-col items-center justify-center">
                <Instagram className="text-white size-7 opacity-0 group-hover:opacity-100 ease-in duration-300 " />
              </span>
            </Link>
            <Link to={"#"} className="shrink-0 overflow-hidden  group relative">
              <img
                src={insta3}
                width={220}
                height={220}
                className="aspect-square object-cover object-center group-hover:scale-105 ease-in duration-300"
              />
              <span className="w-full h-full absolute top-0  bg-black/0 group-hover:bg-black/20 ease-in duration-300 flex flex-col items-center justify-center">
                <Instagram className="text-white size-7 opacity-0 group-hover:opacity-100 ease-in duration-300 " />
              </span>
            </Link>
            <Link to={"#"} className="shrink-0 overflow-hidden  group relative">
              <img
                src={insta4}
                width={220}
                height={220}
                className="aspect-square object-cover object-center group-hover:scale-105 ease-in duration-300"
              />
              <span className="w-full h-full absolute top-0  bg-black/0 group-hover:bg-black/20 ease-in duration-300 flex flex-col items-center justify-center">
                <Instagram className="text-white size-7 opacity-0 group-hover:opacity-100 ease-in duration-300 " />
              </span>
            </Link>
            <Link to={"#"} className="shrink-0 overflow-hidden  group relative">
              <img
                src={insta5}
                width={220}
                height={220}
                className="aspect-square object-cover object-center group-hover:scale-105 ease-in duration-300"
              />
              <span className="w-full h-full absolute top-0  bg-black/0 group-hover:bg-black/20 ease-in duration-300 flex flex-col items-center justify-center">
                <Instagram className="text-white size-7 opacity-0 group-hover:opacity-100 ease-in duration-300 " />
              </span>
            </Link>
          </div>
          <ScrollBar
            orientation="horizontal"
            className="rounded-full opacity-100 lg:opacity-0"
          />
        </ScrollArea>
      </section>
    </>
  );
};

export default Home;
