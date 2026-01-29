import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getRandomColor = () => {
  const colors = [
    "#FF0000", "#0000FF", "#006400", "#FF4500",
    "#800080", "#FF00FF", "#00FFFF", "#FF1493",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const WishlistButton = ({ product, onWishlistClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsClicked(true);

    // Trigger parent handler
    if (onWishlistClick) onWishlistClick(product);

    setTimeout(() => setIsClicked(false), 1000); // reset animation
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm transition-all hover:scale-110"
    >
      <div className="relative flex items-center justify-center backdrop-blur-md">
        <motion.div
          animate={{ scale: isClicked ? [1, 1.5, 1] : 1 }}
          transition={{ duration: 0.4, type: "tween" }}
        >
          <Heart
            size={20}
            className={isClicked ? "fill-red-500 stroke-red-500" : "stroke-gray-400 hover:stroke-gray-600"}
          />
        </motion.div>

        <AnimatePresence>
          {isClicked && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [1, 0],
                    scale: [0, 1.5],
                    x: Math.cos((i * 45 * Math.PI) / 180) * 25,
                    y: Math.sin((i * 45 * Math.PI) / 180) * 25,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    x: Math.cos((i * 45 * Math.PI) / 180) * 25,
                    y: Math.sin((i * 45 * Math.PI) / 180) * 25,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ backgroundColor: getRandomColor() }}
                  className="absolute w-1.5 h-1.5 rounded-full shadow-sm"
                />
              ))}
            </span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};

export default WishlistButton;
