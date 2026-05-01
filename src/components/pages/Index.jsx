import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/effect-fade';

import bgImageSlider from '../../assets/images/gettyimages-1224356307-640x640.jpg'
import heroImg1 from '../../assets/images/hero.png';
import heroImg2 from '../../assets/images/hero-2.png';
import heroImg3 from '../../assets/images/hero-3.png';

import banner1 from '../../assets/images/banner-1.jpg';
import banner2 from '../../assets/images/banner-2.jpg';
import banner3 from '../../assets/images/banner-3.jpg';
import banner4 from '../../assets/images/banner-4.jpg';
import firstBanner from '../../assets/images/laptop-banner.png';

import ProductData from '../../Data.json';

import bannerImg2 from '../../assets/images/banner.jpg';

import brand1 from '../../assets/images/dell.png';
import brand2 from '../../assets/images/samsung.png';
import brand3 from '../../assets/images/sanyo.png';
import brand4 from '../../assets/images/lenovo.png';
import brand5 from '../../assets/images/oppo.png';
import brand6 from '../../assets/images/panasonic.png';
import brand7 from '../../assets/images/asus.png';

import { useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopProducts from '../additions/TopProducts';
import HeroCarousel from '../carousel/HeroCarousel';
import SpecialOfferCard from '../additions/SpecialOfferCard';
import ProductCard from '../additions/ProductCard';
import CartDrawer from '../additions/CartDrawer';
import SectionHeader from '../sections/SectionHeader';
import BestDealsSection from '../sections/BestDealsSection';
import BestSalesSection from '../sections/BestSalesSection';



const heroSlides = [
  {
    image: heroImg1,
    title: "Mega Promotion for New Users",
    subtitle: "Buy now with 25% discount for the first order"
  },
  {
    image: heroImg2,
    title: "Merry Christmas Promotion",
    subtitle: "Buy products from Sony to receive free shipping"
  },
  {
    image: heroImg3,
    title: "Buy everything with installments",
    subtitle: "Receive one installment off when you chose pay in installments"
  },
  {
    image: heroImg1,
    title: "New products from the best producers",
    subtitle: "Find the quality products from the bests"
  },
  {
    image: heroImg2,
    title: "Pay later if you can",
    subtitle: "Pay 30 days later with partnering services"
  },
];


function Index() {
  const cardRefs = useRef([]);
  const products = ProductData.Products;
  const specialOffer = products.find(product => product.Id === 7);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentCart, setCurrentCart] = useState([]);
  const [lastAddedAt, setLastAddedAt] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingIndex = cart.findIndex(item => item.Id === product.Id);
    let updatedCart;

    if (existingIndex === -1) {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    } else {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    setCurrentCart(updatedCart);

    setLastAddedAt(Date.now());
    setIsDrawerOpen(true); // Open the drawer
  };

  const updateQuantity = (id, delta) => {
    const updated = currentCart.map(item => {
      if (item.Id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCurrentCart(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = currentCart.filter(item => item.Id !== id);
    setCurrentCart(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const hero = document.querySelector(".hero-bg");
    if (hero) {
      requestAnimationFrame(() => {
        hero.classList.add("hero-ready");
      });
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      cardRefs.current.forEach(card => { if (card) card.style.height = 'auto' });
      return;
    }
    // Get the max height of all product cards
    let maxHeight = 0;
    cardRefs.current.forEach((card) => {
      if (card) {
        const height = card.offsetHeight;
        if (height > maxHeight) maxHeight = height;
      }
    });

    // Apply the max height to all product cards
    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.height = `${maxHeight}px`;
      }
    });
  }, [products]);

  return (
    <>
      <div className="bg-element"></div>
      {/* Hero Wrapper */}
      <div className="hero-bg relative overflow-hidden w-full">

        {/* BACKGROUND IMAGE LAYER 
          Now constrained to this div's height and width 
        */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImageSlider})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(1.05)',
          }}
        />
        <div className="relative z-10 mx-auto px-[8%] lg:px-[12%]">
          <HeroCarousel slides={heroSlides} slideHeight="420px" />
        </div>
      </div>
      {/* Banners */}
      <div className="px-[8%] lg:px-[12%] py-10">
        {/* First Banner */}
        <div className="relative banner-1 flex flex-col md:flex-row md:items-center justify-start rounded-xl p-6 md:p-16 min-h-[400px] md:min-h-[250px] md:h-[350px] bg-[rgb(237,243,237)] overflow-hidden mt-12">

          {/* CONTENT BLOCK - Appears First */}
          <div className="relative z-10 flex flex-col gap-2 md:gap-4 max-w-full md:max-w-[60%] lg:max-w-[50%]">
            <small className="bg-orange-400 text-white text-xl px-4 py-2 w-fit rounded-md rounded-tl-none">
              Exclusive Laptops
            </small>
            <h3 className="text-3xl md:text-6xl font-semibold font-bricolage leading-[1.1] text-black">
              Release Date & Price
            </h3>
            <p className="text-lg md:text-2xl text-black">
              Today's Super Offer
            </p>
          </div>

          {/* IMAGE SECTION - Stacks below on mobile, absolute on desktop */}
          <div className="mt-auto md:mt-0 md:absolute md:right-0 md:top-0 h-[200px] md:h-full w-full md:w-auto">
            <img
              src={firstBanner}
              className="h-full w-full md:w-auto object-contain z-0 select-none"
              alt="MSI Laptop"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
          {/* Banner 1 */}
          <div
            className="flex flex-col gap-2 bg-cover bg-center rounded-xl p-6 md:p-8 h-[350px] sm:h-[430px]"
            style={{ backgroundImage: `url(${banner1})` }}
          >
            <small className="bg-orange-400 text-white text-xl px-4 py-2 w-fit rounded-md rounded-tl-none">
              New Product
            </small>
            <h3 className="text-xl md:text-2xl font-semibold font-bricolage">Release Date & Price</h3>
            <p className="text-base md:text-lg">Today's Super Offer</p>
          </div>
          {/* Banner 2 */}
          <div
            className="flex flex-col gap-2 bg-cover bg-center rounded-xl p-6 md:p-8 h-[350px] sm:h-[430px]"
            style={{ backgroundImage: `url(${banner2})` }}
          >
            <small className="bg-orange-400 text-white text-xl px-4 py-2 w-fit rounded-md rounded-tl-none">
              New Product
            </small>
            <h3 className="text-xl md:text-2xl font-semibold font-bricolage">Release Date & Price</h3>
            <p className="text-base md:text-lg">Today's Super Offer</p>
          </div>
          {/* Banner 3 */}
          <div
            className="flex flex-col gap-2 bg-cover bg-center rounded-xl p-6 md:p-8 h-[350px] sm:h-[430px]"
            style={{ backgroundImage: `url(${banner3})` }}
          >
            <small className="bg-orange-400 text-white text-xl px-4 py-2 w-fit rounded-md rounded-tl-none ">
              New Product
            </small>
            <h3 className="text-xl md:text-2xl font-semibold font-bricolage">Release Date & Price</h3>
            <p className="text-base md:text-lg">Today's Super Offer</p>
          </div>
          {/* Banner 4 */}
          <div
            className="flex flex-col gap-2 bg-cover bg-center rounded-xl p-6 md:p-8 h-[350px] sm:h-[430px]"
            style={{ backgroundImage: `url(${banner4})` }}
          >
            <small className="bg-orange-400 text-white text-xl px-4 py-2 w-fit rounded-md rounded-tl-none ">
              New Product
            </small>
            <h3 className="text-xl md:text-2xl font-semibold font-bricolage">Release Date & Price</h3>
            <p className="text-base md:text-lg">Today's Super Offer</p>
          </div>
        </div>
      </div>
      {/* 3. Popular Products */}
      <SectionHeader badge="Our Products" title="Popular Products" />

      {/* outer container: px-4 on mobile to prevent squeezing */}
      <div className="product-wrapper px-4 md:px-[8%] lg:px-[12%] py-10">

        {/* Using a flex-col for the main layout on mobile, grid for desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">

          {/* Left Column: Special Offer */}
          <div className="w-full lg:col-span-1 h-auto lg:h-full lg:max-h-[750px] mb-8 lg:mb-0">
            <SpecialOfferCard
              product={specialOffer}
              onAddToCart={handleAddToCart}
              onClick={handleProductClick}
            />
          </div>

          {/* Right Column: Product Grid */}
          <div className="w-full lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <div key={product.Id} className="w-full">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onClick={handleProductClick}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
      {/* 4. Best Deals */}
      <BestDealsSection
        idLink="today-deals"
        products={products}
        handleAddToCart={handleAddToCart}
        handleProductClick={handleProductClick}
      />
      {/* 5. Best Sales (Swiper) */}
      <BestSalesSection
        products={products}
        handleAddToCart={handleAddToCart}
        handleProductClick={handleProductClick}
      />
      {/* Top Products */}
      <SectionHeader badge="Top Products" title="Our Top Products" />
      <TopProducts
        products={products}
        navigate={navigate}
        handleAddToCart={handleAddToCart}
      />

      {/* Banner 2 */}
      <div className="px-[8%] lg:px-[12%] py-10">
        <div
          className="banner-1 flex flex-col justify-center gap-5 bg-cover bg-center rounded-xl md:p-8"
          style={{ backgroundImage: `url(${bannerImg2})` }}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-4xl font-light font-bricolage">SHOP AND <span className="font-bold">SAVE BIG</span> ON HOTTEST TABLETS</h3>
            <small className="bg-orange-400 text-white text-xl px-4 py-2 text-center w-fit rounded-md rounded-tl-none hide">
              <span className="font-thin text-md text-black">STARTING AT</span>
              <div className="text-6xl font-bold p-2 px-5 text-gray-800">
                <sup>$</sup>
                748
                <sup>99</sup>
              </div>
            </small>
          </div>
        </div>
      </div>
      {/* Brands */}
      <div className="px-[8%] lg:px-[12%] py-10">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            1399: { slidesPerView: 5 },
            1199: { slidesPerView: 5 },
            991: { slidesPerView: 4 },
            575: { slidesPerView: 3 },
            0: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="flex items-center justify-center h-20">
              <img
                src={brand1}
                className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-20">
              <img
                src={brand2}
                className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-20">
              <img
                src={brand3}
                className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-20">
              <img
                src={brand4}
                className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-20">
              <img
                src={brand5}
                className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-20">
              <img
                src={brand6}
                className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-20">
              <img
                src={brand7}
                className="object-contain invert-[0.3] hover:invert-[0] cursor-pointer transition"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Drawer Component here */}
      <CartDrawer
        isOpen={isDrawerOpen}
        lastAddedAt={lastAddedAt}
        onClose={() => setIsDrawerOpen(false)}
        cartItems={currentCart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </>
  )
}

export default Index