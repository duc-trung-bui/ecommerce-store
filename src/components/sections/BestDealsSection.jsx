import React, { useRef, useState, useLayoutEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ProductCard from '../additions/ProductCard';

const BestDealsSection = ({ idLink, products, handleAddToCart, handleProductClick }) => {
  // 1. Refs and State to control navigation visibility
  const swiperRef = useRef(null);
  const [slideStatus, setSlideStatus] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const bestDealsProducts = products.slice(4, 16);

  // 2. Helper to update state when user swipes/scrolls
  const handleSlideChange = (swiper) => {
    setSlideStatus({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  return (
    <section className="relative group" id={idLink}>
      <SectionHeader badge="Best Deals" title="Our Best Deals" />

      <div className="px-[8%] lg:px-[12%] py-14 relative">

        {/* --- CUSTOM LEFT BUTTON (Hidden if at start) --- */}
        {!slideStatus.isBeginning && (
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-[2%] lg:left-[8%] top-1/2 -translate-y-1/2 z-20
                    bg-white/40 backdrop-blur-md border border-gray-200/50 
                      shadow-sm rounded-l-md w-10 h-20 
                      flex items-center justify-center text-gray-800 
                    hover:bg-white/80 hover:text-gray-600 hover:shadow-xl transition-all duration-300"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* --- CAROUSEL --- */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-10 !flex items-stretch"
        >
          {bestDealsProducts.map((product) => (
            <SwiperSlide key={product.Id} className="!h-auto flex flex-col">
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onClick={handleProductClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- CUSTOM RIGHT BUTTON (Hidden if at end) --- */}
        {!slideStatus.isEnd && (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-[2%] lg:right-[8%] top-1/2 -translate-y-1/2 z-20
                    bg-white/40 backdrop-blur-md border border-gray-200/50 
                      shadow-sm rounded-r-md w-10 h-20 
                      flex items-center justify-center text-gray-800 
                    hover:bg-white/80 hover:text-gray-600 hover:shadow-xl transition-all duration-300"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default BestDealsSection;