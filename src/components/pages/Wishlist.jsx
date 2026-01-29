import React, { useEffect, useState, startTransition } from "react";

import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  Heart as HeartIcon,
  Frown as SadIcon,
  X as CloseIcon,
  CircleCheck as CheckIcon,
  ShoppingCart as CartIcon,
  ArrowLeft as BackIcon,
  Trash2
} from "lucide-react";

import CartDrawer from "../additions/CartDrawer";

function Wishlist() {
  const [wishList, setWishlist] = useState([]);
  // 1. Add these new states at the top of the Wishlist function
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [lastAddedAt, setLastAddedAt] = useState(null);

  useEffect(() => {
    startTransition(() => {
      const storedWishlist =
        JSON.parse(localStorage.getItem("wishlistItems")) || [];
      setWishlist(storedWishlist);
    });
  }, []);

  const removeFromWishlist = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedWishlist = wishList.filter((item) => item.Id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event("storage"));
        toast.success("Item removed from wishlist");
      }
    });
  };

  const clearWishlist = () => {
    Swal.fire({
      title: "Clear entire wishlist?",
      text: "This will remove all items from your wishlist. You cannot undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Red for danger
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        setWishlist([]); // Clear state
        localStorage.setItem("wishlistItems", JSON.stringify([])); // Clear storage
        window.dispatchEvent(new Event("storage"));
        toast.success("Wishlist cleared");
      }
    });
  };

  // 2. Update the updateQuantity and removeItem helpers (needed for the Drawer)
  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item => {
      if (item.Id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.Id !== id);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  // 3. Updated addToCart to trigger the Drawer instead of Toast
  const addToCart = (product) => {
    const existingIndex = cartItems.findIndex((item) => item.Id === product.Id);
    let updatedCart;

    if (existingIndex !== -1) {
      // If exists, just increment quantity
      updatedCart = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new item
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));

    // Trigger Drawer
    setLastAddedAt(Date.now());
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="w-full px-4 sm:px-8 lg:px-[12%] py-12 bg-white text-gray-800">
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 font-bricolage text-center">
          <HeartIcon
            size={40}
            className="text-pink-500 mr-2 mb-2 inline-block "
          />{" "}
          My Wishlist
        </h1>
        {wishList.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <SadIcon
              size={30}
              className="text-2xl mr-2 inline-block mb-[3px]"
            />{" "}
            No items in your wishlist!
          </div>
        ) : (
          <div className="overflow-hidden hidden md:block">
            <table className="w-full text-left border-separate border-spacing-y-6">
              <thead>
                <tr className="text-sm text-gray-500 border-b border-gray-200">
                  <th></th>
                  <th className="py-3">Product</th>
                  <th className="text-center">Unit Price</th>
                  <th className="text-center">Stock Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishList.map((product) => (
                  <tr
                    key={product.Id}
                    className="bg-white border rounded-xl shadow-sm"
                  >
                    <td className="align-middle text-center">
                      <button
                        onClick={() => removeFromWishlist(product.Id)}
                        className="text-xl text-gray-400 hover:text-red-500 py-3"
                        title="Remove"
                      >
                        <CloseIcon size={16} className="inline-block" />
                      </button>
                    </td>
                    <td className="flex items-center gap-4 py-4 px-2">
                      <Link to={`/product/${product.Id}`}>
                        <img
                          src={product.ProductsImage}
                          alt={product.Name}
                          className="w-24 h-24 object-contain border p-2 rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {/* Product Name as Link */}
                          <Link
                            to={`/product/${product.Id}`}
                            className="hover:text-orange-600 transition-colors"
                          >
                            {product.Name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.Category}
                        </p>
                      </div>
                    </td>
                    <td className="text-center text-gray-800 text-base font-semibold">
                      ${parseFloat(product.Price).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <span className="inline-flex items-center gap-1 text-green-600 text-sm text-medium">
                        <CheckIcon
                          size={20}
                          className="inline-block mt-[2px]"
                        />{" "}
                        In Stock
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center text-white gap-2 px-5 py-2 rounded-full bg-orange-500 text-sm font-semibold hover:bg-orange-600 transition"
                      >
                        <CartIcon size={24} className="inline-block" /> Add to
                        Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {wishList.map((product) => (
            <div
              key={product.Id}
              className="bg-white border rounded-xl shadow-sm p-4"
            >
              <div className="flex justify-between items-end">
                <h3 className="text-lg font-medium text-gray-900">
                  <Link
                    to={`/product/${product.Id}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {product.Name}
                  </Link>
                </h3>
                <button
                  onClick={() => removeFromWishlist(product.Id)}
                  className="text-xl text-gray-400 hover:text-red-500"
                  title="Remove"
                >
                  <CloseIcon size={16} className="inline-block" />
                </button>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={product.ProductsImage}
                  alt={product.Name}
                  className="w-full h-auto object-contain border p-2 rounded-lg"
                />
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <p className="text-sm text-gray-500">{product.Category}</p>
                <p className="text-gray-800 text-base font-semibold mt-2">
                  ${parseFloat(product.Price).toFixed(2)}
                </p>
                <span className="inline-flex items-center gap-1 text-green-600 text-sm text-medium mt-1">
                  <CheckIcon size={20} className="inline-block mt-[2px]" /> In
                  Stock
                </span>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => addToCart(product)}
                  className="inline-flex items-center gap-2 px-5 py-2 text-white rounded-full bg-orange-400 text-sm font-semibold hover:bg-orange-500 transition"
                  title="Add to cart"
                >
                  <CartIcon size={16} className="inline-block" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions Section */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {wishList.length > 0 && (
            <button
              onClick={clearWishlist}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-red-500 border border-red-200 rounded-full hover:bg-red-50 hover:border-red-500 transition-all shadow-sm"
            >
              <Trash2 size={18} />
              Clear Wishlist
            </button>
          )}

          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-orange-500 border border-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-sm"
          >
            <BackIcon size={20} className="inline-block" />
            Continue Shopping
          </Link>
        </div>
      </div>
      <CartDrawer
        isOpen={isDrawerOpen}
        lastAddedAt={lastAddedAt}
        onClose={() => setIsDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </>
  );
}

export default Wishlist;
