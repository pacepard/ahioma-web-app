"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { Product } from "@/types/product";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const HeroCarousal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { openCartModal } = useCartModalContext();

  // Honey product for hero carousel
  const honeyProduct: Product = {
    id: 1,
    title: "Original Ell Novelty Honey",
    price: 5000,
    discountedPrice: 3500,
    imgs: {
      thumbnails: ["/images/hero/hero-001.png"],
      previews: ["/images/hero/hero-001.png"],
    },
    reviews: 128,
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...honeyProduct,
        quantity: 1,
      })
    );
    openCartModal();
  };

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10  sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Original Ell Novelty Honey</a>
            </h1>

            <p>
              The ultimate natural sweetener, harvested for exceptional flavor.
              100% pure and unprocessed, retaining all the subtle, floral notes
              and rich antioxidants that nature intended.
            </p>

            <button
              onClick={handleAddToCart}
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-[#116735] py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </button>
          </div>

          <div >
            <Image
              src="/images/hero/hero-001.png"
              alt="headphone"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>
                 <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Original Ell Novelty Honey</a>
            </h1>

            <p>
              The ultimate natural sweetener, harvested for exceptional flavor.
              100% pure and unprocessed, retaining all the subtle, floral notes
              and rich antioxidants that nature intended.
            </p>

            <button
              onClick={handleAddToCart}
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-[#116735] py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
            >
              Shop Now
            </button>
          </div>

          <div>
            <Image
              src="/images/hero/hero-001.png"
              alt="headphone"
              width={351}
              height={358}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
