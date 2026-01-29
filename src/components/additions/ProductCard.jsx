import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart as CartIcon, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import WishlistButton from './WishlistButton';


const ProductCard = ({ product, onAddToCart, onClick }) => {
  const navigate = useNavigate();

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = wishlist.some((item) => item.Id === product.Id);

    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      window.dispatchEvent(new Event("storage"));
      toast.success("✅ Product added to wishlist");
    } else {
      toast.warning("⚠️ Product is already in the wishlist");
    }

    // Navigate after animation plays (1 second)
    setTimeout(() => {
      navigate("/wishlist");
    }, 1000);
  };

  return (
    <div
      className="relative bg-white shadow-md rounded-xl p-4 flex flex-col items-start hover:shadow-xl transition duration-300 group border border-gray-100 cursor-pointer h-full"
    >
      <div className="flex flex-col items-start w-full">
        <WishlistButton
          product={product}
          onWishlistClick={handleAddToWishlist}
        />

        <p className="text-xs text-white font-bold mb-1 bg-red-600 px-3 py-2 rounded">
          {product.Category}
        </p>

        <div className="w-full h-32 flex items-center justify-center overflow-hidden">
          <img
            src={product.ProductsImage}
            alt={product.Name}
            className="max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
            onClick={() => onClick(product.Id)}
          />
        </div>

        <h4
          className="text-lg font-medium mt-3 text-orange-700 hover:underline line-clamp-2 min-h-[3.5rem]"
          onClick={() => onClick(product.Id)}
        >
          {product.Name}
        </h4>

        <div className="flex mt-auto pt-5 flex-row items-center justify-between w-full">
          {product.OldPrice ? (
            <div className="mt-1 text-md">
              <span className="line-through text-gray-400">${product.OldPrice}</span>{" "}
              <span className="text-red-600 font-bold">${product.Price}</span>
            </div>
          ) : (
            <div className="text-lg font-semibold mt-1">${product.Price}</div>
          )}

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
    </div>
  );
};

export default ProductCard;
