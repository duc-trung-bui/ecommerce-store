import React, { useState } from 'react';
import ProductData from "../../Data.json";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ShoppingCart as CartIcon } from 'lucide-react';
import CartDrawer from '../additions/CartDrawer';
import WishlistButton from '../additions/WishlistButton';

function Shop() {
  const products = ProductData.Products;
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryList = ["All", ...new Set(products.map(p => p.Category))];

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cart.find(item => item.Id === product.Id);

    if (!existingItem) {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      window.dispatchEvent(new Event("storage"));
      setIsDrawerOpen(true);
      setLastAddedAt(new Date().getTime());
    } else {
      setIsDrawerOpen(true);
      toast.info('Item is already in your cart');
    }
  };

  const handleWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const exists = wishlist.find(item => item.Id === product.Id);

    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      toast.success("Added to Wishlist!");
    } else {
      toast.info("Product is already in the wishlist");
    }
    window.dispatchEvent(new Event("storage"));

    // Navigate after animation plays (1 second)
    setTimeout(() => {
      navigate("/wishlist");
    }, 1000);
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item => {
      if (item.Id === id) {
        const newQty = item.quantity + delta;
        return newQty >= 1 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.Id !== id);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.Category === selectedCategory);

  return (
    <>
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cartItems={cartItems}
        lastAddedAt={lastAddedAt}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
      <ToastContainer position="top-right" autoClose={1500} />
      {/* Page Breadcrumbs */}
      <div className="w-full bg-gray-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">Home</Link>
          <span className="text-gray-500">&nbsp; / &nbsp;</span>
          <span className="text-red-900 font-semibold">Shop</span>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Product Cards (Left Side - Large) */}
        <div className="lg:col-span-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Showing: {selectedCategory}</h2>
            <p className="text-gray-500">{filteredProducts.length} Products found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.Id}
                className="relative bg-white shadow-md rounded-2xl p-6 flex flex-col items-start hover:shadow-2xl transition duration-500 group border border-gray-100"
              >
                {/* Wishlist Button - Top Right */}
                <WishlistButton
                  product={product}
                  onWishlistClick={() => handleWishlist(product)}
                />

                <p className="text-xs text-white font-bold mb-2 bg-red-600 px-3 py-1 rounded-lg uppercase tracking-widest">
                  {product.Category}
                </p>

                <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src={product.ProductsImage}
                    alt={product.Name}
                    className="max-w-full max-h-full transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => navigate(`/product/${product.Id}`)}
                  />
                </div>

                <h4
                  className="text-lg font-bold text-orange-600 hover:text-orange-500 transition h-14 line-clamp-2 cursor-pointer leading-tight"
                  onClick={() => navigate(`/product/${product.Id}`)}
                >
                  {product.Name}
                </h4>

                <div className="flex mt-6 flex-row items-center justify-between w-full">
                  <div>
                    {product.OldPrice ? (
                      <div className="flex flex-col">
                        <span className="line-through text-gray-400 text-sm">${product.OldPrice}</span>
                        <span className="text-red-600 font-extrabold text-xl">${product.Price}</span>
                      </div>
                    ) : (
                      <div className="text-xl font-extrabold text-gray-900">${product.Price}</div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 text-white rounded-full w-12 h-12 hover:bg-red-500 shadow-lg transition-all flex items-center justify-center"
                  >
                    <CartIcon size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-xl italic">
              No products available in this selection.
            </div>
          )}
        </div>

        {/* Sidebar (Right Side - Narrower Filter Column) */}
        <div className="filters space-y-8 lg:col-span-1">

          <div className="flex flex-col">
            <h2 className="border-b pb-2 mb-4 border-orange-200 font-bold text-xl">Categories</h2>
            <ul className="space-y-3">
              {categoryList.map((cat) => (
                <li
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer transition hover:translate-x-1 flex items-center justify-between group ${selectedCategory === cat ? 'text-orange-600 font-bold' : 'text-gray-600'}`}
                >
                  <span className="group-hover:text-orange-500">{cat}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {cat === "All" ? products.length : products.filter(p => p.Category === cat).length}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="border-b pb-2 mb-4 border-orange-200 font-bold text-xl">Brands</h2>
            <ul className="space-y-3">
              {["Apple", "Samsung", "Lenovo", "Asus", "MSI"].map(brand => (
                <li key={brand} className="hover:text-orange-500 transition hover:translate-x-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input type="checkbox" className="accent-orange-500 h-4 w-4" />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="border-b pb-2 mb-4 border-orange-200 font-bold text-xl">Colors</h2>
            <div className="grid grid-cols-1 gap-3">
              {["Gold", "Silver", "Blue", "Green", "White", "Black"].map(color => (
                <label key={color} className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-orange-500 transition group">
                  <input type="checkbox" className="accent-orange-500 h-4 w-4" />
                  <span className="text-sm group-hover:translate-x-1 transition-transform">{color}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Shop;