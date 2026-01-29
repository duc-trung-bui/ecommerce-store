import React, { useEffect, useRef } from "react";
import { ShoppingCart as CartIcon } from 'lucide-react';
import WishlistButton from "./WishlistButton";
import bannerCard1 from '../../assets/images/product-banner-5.jpg';
import { toast } from 'react-toastify';

function TopProducts({ products, navigate, handleAddToCart }) {
  // Create an array of refs for each column
  const colRefs = useRef([[], [], []]); // still only needed for product columns

  useEffect(() => {
    colRefs.current.forEach((col) => {
      let maxHeight = 0;
      // Find max height in this column
      col.forEach((card) => {
        if (card) maxHeight = Math.max(maxHeight, card.offsetHeight);
      });
      // Apply max height to all cards in this column
      col.forEach((card) => {
        if (card) card.style.height = `${maxHeight}px`;
      });
    });
  }, [products]);

  const slices = [
    products.slice(1, 4),   // Featured
    products.slice(5, 8),   // On Sale
    products.slice(10, 13), // Top Rated
  ];

  const titles = ["Featured Products", "On Sale Products", "Top Rated Products"];

  const handleAddToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = wishlist.some((item) => item.Id === product.Id);

    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      window.dispatchEvent(new Event("storage"));
      toast.success("✅ Product added to wishlist");
    } else
      toast.warning("⚠️ Product is already in the wishlist");

    // Navigate after animation plays (1 second)
    setTimeout(() => {
      navigate("/wishlist");
    }, 1000);
  };


  return (
    <div className="px-[8%] lg:px-[12%] py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mx-auto">
      {slices.map((slice, colIndex) => (
        <div key={colIndex} className="flex flex-col items-start w-full">
          <div className="mb-6 w-full text-left">
            <h2 className="text-xl font-bricolage font-semibold text-gray-900 pb-2">
              {titles[colIndex]}
            </h2>
            <div className="h-[3px] w-48 bg-orange-400 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-5 mt-9">
            {slice.map((product, index) => (
              <div
                key={product.Id}
                ref={(el) => (colRefs.current[colIndex][index] = el)}
                className="relative bg-white shadow-md rounded-xl p-4 flex flex-col items-start 
                           hover:shadow-lg transition-all duration-300 group border border-gray-100 
                           cursor-pointer w-full"
              >
                {/* Wishlist Button */}
                <WishlistButton
                  product={product}
                  onWishlistClick={() => handleAddToWishlist(product)}
                />
                <p className="text-xs text-white font-bold mb-1 bg-red-600 px-3 py-2 rounded">
                  {product.Category}
                </p>
                <div className="w-full h-32 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.ProductsImage}
                    alt={product.Name}
                    className="max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                    onClick={() => navigate(`/product/${product.Id}`)}
                  />
                </div>
                <h4
                  className="text-lg font-medium mt-3 text-orange-700 hover:underline line-clamp-2 min-h-[3.5rem]"
                  onClick={() => navigate(`/product/${product.Id}`)}
                >
                  {product.Name}
                </h4>
                <div className="flex mt-5 flex-row items-center justify-between w-full">
                  {product.OldPrice ? (
                    <div className="mt-1 text-md">
                      <span className="line-through text-gray-400">${product.OldPrice}</span>{" "}
                      <span className="text-red-600 font-bold">${product.Price}</span>
                    </div>
                  ) : (
                    <div className="text-lg font-semibold mt-1">${product.Price}</div>
                  )}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-400 text-white rounded-full w-[45px] h-[45px] hover:bg-red-500 hover:shadow-xl transition items-center justify-center flex"
                  >
                    <CartIcon size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Fourth column: Banner */}
      <div className="flex flex-col items-center">
        <div className="mt-2">
          <img src={bannerCard1} alt="Special Banner" className="w-full object-contain rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
