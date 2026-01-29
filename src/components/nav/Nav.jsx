import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CircleUser as UserIcon,
  Phone as PhoneIcon,
  Heart as HeartIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronDown,
  Search as SearchIcon,
  Mail as MailIcon
} from "lucide-react";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [mobileCurrOpen, setMobileCurrOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const categories = [
    ["Smartphone", "📱"], ["PC", "💻"], ["Laptop", "🖥️"],
    ["Tablet", "📲"], ["Sound Systems", "🔊"], ["Camera", "📷"],
    ["Smartwatch", "⌚"], ["Monitor", "🖥️"], ["Gaming Console", "🎮"],
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "Faq's", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };
    updateCounts();
    window.addEventListener('storage', updateCounts);
    return () => window.removeEventListener('storage', updateCounts);
  }, []);

  return (
    <>
      <nav className="w-full flex flex-col justify-center items-center relative border-b bg-white">

        {/* 1. TOP BAR (Desktop) */}
        <div className="hidden lg:flex w-full justify-between items-center bg-black text-white px-[8%] lg:px-[12%] py-2 text-sm">
          <div className="flex gap-5 items-center">
            <div className="relative group">
              <span className="cursor-pointer flex items-center hover:text-orange-600 transition">
                English <span className="ml-1 text-[10px]">▼</span>
              </span>
              <ul className="absolute top-full left-0 bg-white text-black shadow-md transition rounded-md p-3 hidden group-hover:flex flex-col gap-2 z-50 w-32">
                <li className="hover:text-orange-500 cursor-pointer">Français</li>
                <li className="hover:text-orange-500 cursor-pointer">Deutsch</li>
              </ul>
            </div>
            <div className="relative group">
              <span className="cursor-pointer flex items-center hover:text-orange-600 transition">
                USD <span className="ml-1 text-[10px]">▼</span>
              </span>
              <ul className="absolute top-full left-0 bg-white text-black shadow-md transition rounded-md p-3 hidden group-hover:flex flex-col gap-2 z-50 w-32">
                <li className="hover:text-orange-500 cursor-pointer">USD</li>
                <li className="hover:text-orange-500 cursor-pointer">EUR</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2 hover:text-orange-500 transition cursor-default">
              <PhoneIcon size={14} className="text-orange-500" />
              <span>+01 9232 3112</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-500 transition cursor-default">
              <MailIcon size={14} className="text-orange-500" />
              <span>support12345@osmetico.com</span>
            </div>
          </div>

          <ul className="flex gap-5 justify-end items-center">
            <li className="text-orange-400 font-bold uppercase tracking-wider text-xs">
              ⚡<a href="#" className="hover:underline">Flash Sale</a>
            </li>
          </ul>
        </div>

        {/* 2. MIDDLE NAV */}
        <div className="w-full flex justify-between items-center px-[5%] lg:px-[12%] py-4 lg:py-6 gap-4 lg:gap-10">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-black">
            <MenuIcon size={32} />
          </button>

          <div className="w-auto lg:w-1/5">
            <Link to="/">
              <h2 className="text-4xl lg:text-5xl font-bricolage text-black font-bold tracking-tighter">
                Osme<span className="text-orange-500">tico</span>
              </h2>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center h-14 w-full max-w-2xl border-2 border-orange-500 rounded-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative border-r border-gray-200 h-full">
              <select className="h-full appearance-none bg-transparent pl-6 pr-10 text-base font-semibold font-bricolage text-gray-700 outline-none cursor-pointer hover:bg-gray-50">
                <option>All Categories</option>
                {categories.map(([label], i) => (
                  <option key={i}>{label}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown size={16} />
              </div>
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-5 h-full text-base outline-none bg-transparent"
            />
            <button className="bg-orange-500 text-white h-full px-8 font-bold text-base uppercase hover:bg-orange-600 transition-colors flex items-center gap-2">
              <SearchIcon size={20} />
              <span>Search</span>
            </button>
          </div>

          {/* Icons (Login now placed next to cart) */}
          <div className="flex gap-4 lg:gap-8 items-center justify-end">
            <Link to="/login" className="group">
              <UserIcon size={30} className="text-gray-600 group-hover:text-orange-600 transition" />
            </Link>

            <Link to="/wishlist" className="relative group">
              <HeartIcon size={30} className="text-gray-600 group-hover:text-orange-600 transition" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative group">
              <CartIcon size={30} className="text-gray-600 group-hover:text-orange-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* 3. BOTTOM BAR */}
        <div className="hidden lg:flex w-full px-[12%] py-4 justify-between items-center gap-6 border-t border-gray-100">
          <div className="relative w-1/4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCatOpen(!catOpen)}>
              <div className="bg-gray-200 text-white p-2.5 rounded">
                <MenuIcon size={24} />
              </div>
              <span className="font-bold text-lg text-black">Shop Categories</span>
            </div>
            {catOpen && (
              <ul className="absolute top-full left-0 bg-white shadow-2xl rounded-b-lg overflow-hidden mt-4 w-72 z-40 border border-gray-100">
                {categories.map(([label, icon], i) => (
                  <Link to="#" key={i} className="flex items-center gap-4 px-6 py-4 border-b last:border-none hover:bg-orange-50 hover:text-orange-600 transition text-base font-medium">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <ul className="flex flex-1 justify-center gap-10 font-semibold text-black">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-orange-500 transition-colors uppercase text-lg tracking-tight">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/#today-deals"
            className="flex items-center group gap-3 px-6 py-3 border border-orange-600 hover:border-red-600 hover:text-gray-700 rounded-full transition"
            onClick={() => {
              const element = document.getElementById("today-deals");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="font-semibold text-base transition-colors uppercase">Today's Deals</span>
            <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-full uppercase font-bold group-hover:animate-hot-bounce">Hot</span>
          </Link>
        </div>

        {/* 4. MOBILE DRAWER */}
        <div className={`fixed inset-0 bg-black/60 z-[999] transition-opacity lg:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMenuOpen(false)}>
          <div className={`fixed top-0 left-0 h-full w-[90%] max-w-[350px] bg-white z-[1000] shadow-2xl transition-transform duration-300 transform flex flex-col ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} onClick={(e) => e.stopPropagation()}>

            <div className="flex justify-between items-center p-6 border-b bg-orange-500 text-white">
              <h2 className="text-2xl font-bold uppercase tracking-tight">MENU</h2>
              <button onClick={() => setMenuOpen(false)}><CloseIcon size={32} /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 bg-gray-50 border-b">
                <div className="flex items-center bg-white border-2 border-orange-500 rounded-full px-4 py-3">
                  <input type="text" placeholder="Search products..." className="flex-1 bg-transparent outline-none text-lg" />
                  <SearchIcon size={24} className="text-orange-500" />
                </div>
              </div>

              <ul className="flex flex-col p-6 border-b">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} onClick={() => setMenuOpen(false)} className="block py-4 text-xl font-bold text-gray-900 border-b border-gray-100 last:border-none hover:text-orange-500 uppercase">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="px-6 py-4 border-b">
                <button onClick={() => setMobileCatOpen(!mobileCatOpen)} className="flex items-center justify-between w-full font-bold text-lg text-black uppercase">
                  <span>Categories</span>
                  <ChevronDown size={20} className={`transition-transform ${mobileCatOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid gap-2 overflow-hidden transition-all duration-300 ${mobileCatOpen ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
                  {categories.map(([label, icon], i) => (
                    <Link key={i} to="#" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 py-2 px-3 hover:bg-orange-50 rounded-lg text-lg font-medium">
                      <span>{icon}</span> {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 space-y-4 border-b">
                <div>
                  <button onClick={() => setMobileLangOpen(!mobileLangOpen)} className="flex items-center justify-between w-full font-bold text-lg text-black uppercase">
                    <span>Language: English</span>
                    <ChevronDown size={20} className={`transition-transform ${mobileLangOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`flex flex-col gap-2 overflow-hidden transition-all ${mobileLangOpen ? 'max-h-32 mt-2' : 'max-h-0'}`}>
                    <span className="p-2 bg-gray-50 rounded text-gray-700">Français</span>
                    <span className="p-2 bg-gray-50 rounded text-gray-700">Deutsch</span>
                  </div>
                </div>

                <div>
                  <button onClick={() => setMobileCurrOpen(!mobileCurrOpen)} className="flex items-center justify-between w-full font-bold text-lg text-black uppercase">
                    <span>Currency: USD</span>
                    <ChevronDown size={20} className={`transition-transform ${mobileCurrOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`flex flex-col gap-2 overflow-hidden transition-all ${mobileCurrOpen ? 'max-h-32 mt-2' : 'max-h-0'}`}>
                    <span className="p-2 bg-gray-50 rounded text-gray-700">USD</span>
                    <span className="p-2 bg-gray-50 rounded text-gray-700">EUR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Info & Flash Sale link at bottom */}
            <div className="p-6 bg-gray-50 border-t space-y-4">
              <Link to="/flash-sale" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 text-xl font-bold text-orange-600 uppercase">
                ⚡ Flash Sale
              </Link>
              <div className="space-y-2">
                <a href="tel:+0192323112" className="flex items-center gap-4 text-lg font-bold text-gray-800">
                  <PhoneIcon size={20} className="text-orange-500" /> +01 9232 3112
                </a>
                <a href="mailto:support12345@osmetico.com" className="flex items-center gap-4 text-base font-bold text-gray-800 break-all">
                  <MailIcon size={20} className="text-orange-500" /> support12345@osmetico.com
                </a>
              </div>
            </div>
          </div>
        </div>

      </nav>
    </>
  );
}

export default Nav;