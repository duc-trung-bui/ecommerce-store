import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';

const SpecialOfferCard = ({ product, onAddToCart, onClick }) => {
  const INITIAL_TIME = 24 * 60 * 60;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [hasAppeared, setHasAppeared] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? INITIAL_TIME : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAppeared(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);
  if (!product) return null;

  return (
    <div
      ref={cardRef}
      className="relative p-[2px] rounded-xl overflow-hidden h-full shadow-md bg-gray-100"
    >
      {/* 1. THE MAIN DRAWING BORDER */}
      <div
        className={`absolute inset-[-100%] z-0 ${hasAppeared ? 'animate-draw' : ''}`}
        style={{
          background: `conic-gradient(from 0deg, #fb923c var(--angle), transparent var(--angle))`
        }}
      />

      {/* 2. THE GLOWING TIP 
          This layer creates a bright white/yellow point at the leading edge of the drawing line.
          It uses the same --angle but is masked to look like a tiny comet head.
      */}
      {/* THE YELLOW GLOWING TIP */}
      <div
        className={`absolute inset-[-100%] z-[5] pointer-events-none ${hasAppeared ? 'animate-glow-tip' : 'opacity-0'}`}
        style={{
          background: `conic-gradient(
            from 0deg, 
            transparent calc(var(--angle) - 15deg), 
            #fbbf24 calc(var(--angle) - 2deg), 
            #fffbeb var(--angle), 
            transparent var(--angle)
          )`,
          filter: 'blur(6px) brightness(1.2)',
        }}
      />

      {/* INNER CONTENT */}
      <div className="relative bg-white p-6 rounded-[calc(0.75rem-2px)] flex flex-col items-center justify-center text-center h-full z-10">
        <span className="text-xl text-white font-bold mb-1 bg-red-600 px-3 py-2 rounded">
          Special Offer
        </span>

        <div className="absolute top-4 right-2 bg-orange-400 text-white rounded-full h-16 w-16 flex items-center justify-center font-bold text-sm leading-tight shadow-md">
          Save <br /> $120
        </div>

        <img
          src={product.ProductsImage}
          alt={product.Name}
          className="w-4/5 mx-auto my-4 cursor-pointer hover:scale-105 transition duration-300"
          onClick={() => onClick(product.Id)}
        />

        <h3 className="text-orange-700 font-semibold text-lg cursor-pointer hover:underline" onClick={() => onClick(product.Id)}>
          {product.Name}
        </h3>

        <div className="mt-2">
          <span className="line-through text-gray-400">${product.OldPrice}</span>{" "}
          <span className="text-red-600 text-xl font-bold">${product.Price}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-4">
          <div className="flex justify-between text-xs font-medium mb-1 text-gray-500">
            <span>Available: 6</span>
            <span>Already sold: 27</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-orange-400 w-1/5 h-full rounded-full"></div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-6 w-full mb-6">
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">Offer Ends In:</p>
          <div className="flex justify-center gap-2">
            {[{ v: time.h, l: 'Hrs' }, { v: time.m, l: 'Min' }, { v: time.s, l: 'Sec' }].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-gray-800 text-white rounded w-11 py-2 text-lg font-mono font-bold leading-none">
                  {item.v}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 uppercase font-bold">{item.l}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="bg-orange-400 text-white rounded-full w-[45px] h-[45px] hover:bg-red-500 hover:shadow-xl transition items-center justify-center flex"
        >
          <CartIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default SpecialOfferCard;