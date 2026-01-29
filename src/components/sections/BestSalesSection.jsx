import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../additions/ProductCard';
import SectionHeader from './SectionHeader';

import 'swiper/css';
import 'swiper/css/navigation';

const BestSalesSection = ({ products, handleAddToCart, handleProductClick }) => {
  const swiperRef = useRef(null);

  const [slideStatus, setSlideStatus] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const bestSalesProducts = products.slice(0, 12);
  const slides = bestSalesProducts.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / 6);
    if (!result[chunkIndex]) result[chunkIndex] = [];
    result[chunkIndex].push(item);
    return result;
  }, []);

  const handleSlideChange = (swiper) => {
    setSlideStatus({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  };

  return (
    <section className="relative group/section overflow-hidden">
      <SectionHeader badge="Best Sales" title="Our Best Sales" />

      {/* 1. This outer div handles the page margins (8% - 12%) */}
      <div className="px-[8%] lg:px-[12%] py-14 relative group">

        {/* 2. This is the 'Clipping' div. It ensures nothing goes past the margins */}
        <div className="overflow-hidden">

          {/* --- CUSTOM LEFT BUTTON --- */}
          {!slideStatus.isBeginning && (
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-[2%] lg:left-[8%] top-1/2 -translate-y-1/2 z-20
                       bg-white/70 backdrop-blur-md border border-gray-200/50 
                       shadow-md rounded-l-md w-10 h-20 
                       flex items-center justify-center text-gray-800 
                       hover:bg-white/80 hover:text-gray-600 hover:shadow-xl
                       opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
          )}
          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              spaceBetween={30}
              loop={false}
              autoplay={{ delay: 4000, disableOnInteraction: true }}
              speed={1000}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              className="!overflow-visible"
            >
              {slides.map((chunk, idx) => (
                <SwiperSlide key={idx} className="!overflow-visible pb-12 px-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {chunk.map((product) => (
                      <div key={product.Id} className="w-full">
                        <ProductCard
                          product={product}
                          onAddToCart={handleAddToCart}
                          onClick={handleProductClick}
                          className="h-full w-full"
                        />
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* --- CUSTOM RIGHT BUTTON --- */}
          {!slideStatus.isEnd && (
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-[2%] lg:right-[8%] top-1/2 -translate-y-1/2 z-20
                       bg-white/70 backdrop-blur-md border border-gray-200/50 
                       shadow-md rounded-r-md w-10 h-20 
                       flex items-center justify-center text-gray-800 
                       hover:bg-white/80 hover:text-gray-600 hover:shadow-xl
                       opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </section >
  )
};

export default BestSalesSection;