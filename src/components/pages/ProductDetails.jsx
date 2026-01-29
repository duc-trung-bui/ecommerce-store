import React, { useEffect, useState, startTransition } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import ProductData from "../../Data.json";
import { useParams, useNavigate, Link } from "react-router-dom";

import brand1 from "../../assets/images/dell.png";
import brand2 from "../../assets/images/samsung.png";
import brand3 from "../../assets/images/sanyo.png";
import brand4 from "../../assets/images/lenovo.png";
import brand5 from "../../assets/images/oppo.png";
import brand6 from "../../assets/images/panasonic.png";
import brand7 from "../../assets/images/asus.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import { ShoppingCart as CartIcon, Heart as HeartIcon, Truck, RotateCcw, ChevronDown } from "lucide-react";
import CartDrawer from "../additions/CartDrawer";

function ProductDetails() {
  const { id } = useParams();
  const products = ProductData.Products;
  const navigate = useNavigate();
  const product = products.find((prod) => prod.Id === parseInt(id));
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("description");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(null);

  // Filter out the current product and take the first 4 for the "Bought Together" section
  const relatedProducts = products.filter(p => p.Id !== parseInt(id)).slice(0, 4);

  const [activeImage, setActiveImage] = useState(product?.ProductsImage);
  const [prevId, setPrevId] = useState(id);

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  if (id !== prevId) {
    setPrevId(id);
    setActiveImage(product?.ProductsImage);
  }

  const productGallery = [
    product.ProductsImage, // 1. From your data
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000", // 2. Web
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000", // 3. Web
    "https://media.wired.com/photos/684368b03c448a9bc4a5dc90/master/w_1600%2Cc_limit/Galaxy%2520A36%2520SOURCE%2520Julian%2520Chokkattu.png", // 4. Web
    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-storage-select-202405-13inch-starlight-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=80&.v=TENLTVRoeFdHUUI5ZE1ZZmxpQUlNMm5pQUoxb0NIVEJFSjRVRzZ4dzV5VG9xblRoSytlREYxb2tmSnZTRlIvWmxzVWxuaTA3UGxIdzhKNUtuSEF5VlVtYW1kMXNQLzdDd2NuUVFzTDNlZmEyTE1mSHgwMHh1SlVoUDJNTksyTUZnWG04VnYwV0NCYVhKcVlFN0RlblJR&traceId=1", // 5. NEW IMAGE
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleMouseMove = (e) => {
    // Check if we are on desktop before calculating coordinates
    if (window.innerWidth < 768) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    // 1. Calculate raw percentages based on mouse position
    let xPct = ((e.clientX - left) / width) * 100;
    let yPct = ((e.clientY - top) / height) * 100;

    // 2. Define constraints based on lens size (30%)
    // Because the lens is centered (translate -50%), we need to stop the center point
    // from getting closer to the edge than half the lens size.
    const lensSizePct = 30; // Must match width/height in JSX below
    const minBoundary = lensSizePct / 2; // 15%
    const maxBoundary = 100 - minBoundary; // 85%

    // 3. Clamp the values.
    // Math.max ensures it doesn't go below 15%
    // Math.min ensures it doesn't go above 85%
    const constrainedX = Math.max(minBoundary, Math.min(maxBoundary, xPct));
    const constrainedY = Math.max(minBoundary, Math.min(maxBoundary, yPct));

    setMousePosition({ x: constrainedX, y: constrainedY });
  };

  const [isWishlisted, setIsWishlisted] = useState(false);


  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab("description"); // Reset to description tab
  }, [id]);

  useEffect(() => {
    startTransition(() => {
      const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
      const exists = wishlist.some((item) => item.Id === product?.Id);
      setIsWishlisted(exists);
    });
  }, [product?.Id]);

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = wishlist.some((item) => item.Id === product.Id);
    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      toast.success("✅ Product added to wishlist");
    } else toast.warning("⚠️ Product is already in the wishlist");

    setTimeout(() => {
      navigate("/wishlist");
    }, 1000);
  };

  // Updated handler within ProductDetails
  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.Id === product.Id);

    let updatedCart;
    if (!existingItem) {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    } else {
      updatedCart = cartItems.map(item =>
        item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setLastAddedAt(Date.now());
    setIsDrawerOpen(true);
  };

  // Update and Remove helpers
  const onUpdateQuantity = (id, delta) => {
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.Id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  const onRemove = (id) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.Id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  if (!product) {
    return (
      <div className="p-10 text-center text-xl alert alert-danger">
        Product not found
      </div>
    );
  }

  return (
    <>
      <div key={id}>
        <ToastContainer position="top-right" autoClose={1500} />
        {/* Page Section */}
        <div className="w-full bg-gray-100 py-4 px-[8%] lg:px-[12%]">
          <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
            <Link to="/" className="hover:underline text-gray-700 font-medium">
              Home
            </Link>
            <span className="text-gray-500">&nbsp; / &nbsp;</span>
            <span className="text-orange-600 font-semibold">Product Details</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row items-start gap-10 px-[8%] lg:px-[12%] py-20">

          {/* Left Side: Image Container - Compact Version */}
          <div className="w-full md:w-1/2 relative group">
            <div className="p-6 border rounded-2xl shadow-lg bg-white relative transition-all duration-500">

              {/* MAIN IMAGE VIEWPORT - Reduced Height */}
              <div
                className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl cursor-crosshair border border-gray-100 flex items-center justify-center bg-white p-6"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={product.Name}
                  className="max-w-full h-full object-contain animate-fadeIn transition-opacity duration-300"
                />

                {/* THE LENS */}
                {showZoom && (
                  <div
                    className="absolute cursor-pointer border border-orange-500 bg-orange-500/10 hidden md:block"
                    style={{
                      width: "25%", // Slightly smaller lens for shorter height
                      height: "25%",
                      left: `${mousePosition.x}%`,
                      top: `${mousePosition.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>

              {/* ZOOM POPUP - Adjusted to match new height */}
              {showZoom && (
                <div
                  className="absolute top-0 left-[105%] w-full h-full border-2 border-gray-100 bg-white shadow-2xl z-[100] hidden md:block overflow-hidden rounded-2xl"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                    backgroundSize: "250%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}

              {/* THUMBNAIL NAVIGATION */}
              <div className="mt-5">
                <Swiper
                  slidesPerView={5} // This matches our 5 images perfectly
                  spaceBetween={8}
                  className="pb-1"
                >
                  {productGallery.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => setActiveImage(img)}
                        className={`relative h-14 md:h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${activeImage === img ? "border-orange-500 scale-95 shadow-sm" : "border-transparent hover:border-gray-200"
                          }`}
                      >
                        <img
                          src={img}
                          className="w-full h-full object-contain"
                          alt={`product-view-${index}`}
                        />
                        {/* Active Overlay for better visibility */}
                        {activeImage === img && (
                          <div className="absolute inset-0 bg-orange-500/5" />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Right Side: Product Info & Buy Buttons */}
          <div className="w-full md:w-1/2">
            <p className="text-sm font-semibold bg-red-500 inline-block px-3 py-1 rounded text-white mb-4">
              {product.Category}
            </p>
            <h2 className="text-3xl font-bold font-bricolage text-black mb-3">
              {product.Name}
            </h2>

            <div className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-3">
              ${product.Price}
              {product.OldPrice && (
                <span className="text-gray-400 text-md line-through font-medium">
                  ${product.OldPrice}
                </span>
              )}
            </div>

            <ul className="text-gray-700 mb-8 list-disc ml-5 space-y-3 font-bricolage">
              <li>Cutting-edge performance with the latest processing technology.</li>
              <li>Stunning high-resolution display for an immersive visual experience.</li>
              <li>Ergonomic design crafted from premium, sustainable materials.</li>
              <li>Advanced battery management for all-day productivity and play.</li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="group flex-1 min-w-[200px] px-8 py-4 rounded-xl border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <span className="text-md flex items-center justify-center gap-2">
                  <CartIcon size={22} /> Add to Cart
                </span>
              </button>

              <button
                onClick={handleAddToWishlist}
                className="group flex-1 min-w-[200px] px-8 py-4 rounded-xl bg-orange-400 text-white font-bold hover:bg-red-500 transition-all duration-300"
              >
                <span className="text-md flex items-center justify-center gap-2">
                  <HeartIcon size={22} className={isWishlisted ? "fill-white" : "group-hover:scale-125 transition-transform"} />
                  {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                </span>
              </button>
            </div>

            {/* Trust Badges Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-gray-800"></span>
                Estimated delivery time: 3-5 business days
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-gray-800"></span>
                24 months official warranty door-to-door
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium text-sm whitespace-nowrap">
                <span className="shrink-0 w-2 h-2 rounded-full bg-gray-800"></span>
                Use code <span className="text-red-600 font-bold">FREESHIP10</span> for extra 10% off
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Centralized */}
        <div className="px-[8%] lg:px-[12%] mt-16 border-b border-gray-200">
          <div className="flex flex-wrap gap-4 md:gap-12 justify-center">
            {["description", "specifications", "reviews", "bought together"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm md:text-lg font-semibold capitalize transition-all duration-300 relative ${activeTab === tab ? "text-orange-500" : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-lg transition-all duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area - Centralized Content */}
        <div className="px-[8%] lg:px-[12%] py-12 min-h-[400px]">

          {/* 1. PRODUCT DESCRIPTION */}
          {activeTab === "description" && (
            <div
              key="description"
              className="space-y-20 max-w-6xl mx-auto"
            >
              {/* Block 1 - Smartphone (Image Left, Text Right) */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200"
                    alt="Smartphone"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold font-bricolage mb-4 text-orange-600">Advanced Connectivity</h3>
                  <p className="text-gray-700 leading-relaxed font-bricolage">
                    Experience cutting-edge technology in the palm of your hand. This device features a stunning edge-to-edge display, perfect for streaming your favorite content in vivid detail. Stay connected with lightning-fast speeds and a battery life that keeps up with your busiest days.
                  </p>
                </div>
              </motion.div>

              {/* Block 2 - Tablet (Text Left, Image Right) */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex flex-col md:flex-row-reverse items-center gap-12 text-center md:text-left"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200"
                    alt="Tablet"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold font-bricolage mb-4 text-orange-600">Portable Productivity</h3>
                  <p className="text-gray-700 leading-relaxed font-bricolage">
                    Transform the way you work and play. Designed for creativity and productivity, this tablet offers an intuitive interface and compatibility with a wide range of accessories. Whether you are illustrating your next masterpiece or managing complex spreadsheets, this is your ultimate companion.
                  </p>
                </div>
              </motion.div>

              {/* Block 3 - Induction Panel (Image Left, Text Right) */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src="https://media.istockphoto.com/id/999864568/photo/frying-pan-on-induction-panel-at-modern-kitchen-in-front-of-blank-white-wall.jpg?s=170667a&w=0&k=20&c=SCJUU-LxsWAyoRQgpY38IXMal1YZpNzQCz1o8WWcMgc="
                    alt="Modern Induction Panel"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-md"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold font-bricolage mb-4 text-orange-600">Precision Cooking</h3>
                  <p className="text-gray-700 leading-relaxed font-bricolage">
                    Revolutionize your kitchen with our precision induction panel. Featuring ultra-fast heating technology and a sleek, easy-to-clean glass surface, it offers unmatched control and safety for the modern culinary enthusiast. Experience gourmet results with every meal.
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* 2. SPECIFICATIONS */}
          {activeTab === "specifications" && (
            <div className="max-w-3xl mx-auto animate-fadeIn">
              <h3 className="text-2xl font-bold font-bricolage mb-8 text-center text-orange-600">Technical Specifications: iPhone 17 Pro Max</h3>
              <div className="divide-y divide-gray-100 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                {[
                  ["Display", '6.9" Super Retina XDR OLED, 120Hz ProMotion'],
                  ["Resolution", "2868 × 1320 pixels (460 ppi)"],
                  ["Processor", "A19 Pro Bionic Chip (3nm Architecture)"],
                  ["GPU", "6-core Apple-designed GPU with Ray Tracing"],
                  ["Camera System", "48MP Main | 48MP Ultra Wide | 48MP Telephoto"],
                  ["Video Recording", "4K HDR up to 60fps, ProRes supported"],
                  ["Front Camera", "24MP TrueDepth with Autofocus"],
                  ["Battery", "5400 mAh with 45W Fast Charging"],
                  ["Wireless Charging", "MagSafe & Qi2 support"],
                  ["Operating System", "iOS 19 (Upgradeable)"],
                  ["Storage Options", "256GB / 512GB / 1TB / 2TB"],
                  ["RAM", "12GB LPDDR5X"],
                  ["Connectivity", "5G, Wi-Fi 7, Bluetooth 5.4"],
                  ["Biometrics", "Under-display FaceID & TouchID"],
                  ["Build Material", "Grade 5 Titanium Frame"],
                  ["Water Resistance", "IP68 (up to 6m for 30 min)"],
                  ["Finish", "Black, White, Natural, Teal Titanium"]
                ].map(([key, value], idx) => (
                  <div
                    key={idx}
                    className={`flex py-4 px-4 rounded-lg ${idx % 2 === 1 ? "bg-gray-50" : ""
                      }`}
                  >
                    <span className="w-1/3 font-bold text-gray-900">{key}</span>
                    <span className="w-2/3 text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 3. REVIEWS - Redesigned Layout */}
          {activeTab === "reviews" && (
            <div className="animate-fadeIn max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">

                {/* Left Side: Rating Snapshot */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 font-bricolage text-orange-600">Customer Reviews</h3>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-900">4.8</h1>
                      <div className="text-orange-400 text-lg">★★★★★</div>
                      <p className="text-sm text-gray-500 mt-1">124 Reviews</p>
                    </div>

                    <div className="flex-1 space-y-2">
                      {[
                        { star: 5, count: 85, color: "bg-orange-500" },
                        { star: 4, count: 25, color: "bg-orange-500" },
                        { star: 3, count: 10, color: "bg-orange-500" },
                        { star: 2, count: 3, color: "bg-red-400" },
                        { star: 1, count: 1, color: "bg-red-500" },
                      ].map((row) => (
                        <div key={row.star} className="flex items-center gap-4 text-sm">
                          <span className="w-12 text-gray-600 font-medium">{row.star} stars</span>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full ${row.color}`}
                              style={{ width: `${(row.count / 124) * 100}%` }}
                            />
                          </div>
                          <span className="w-8 text-gray-400 text-right">{row.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Form Container */}
                <div className="animate-fadeIn max-w-4xl">
                  <h3 className="text-2xl font-bold mb-10 font-bricolage text-orange-600">Write a Review</h3>

                  <form className="space-y-5">

                    {/* 1. Rating Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 group">
                      <div className="md:col-span-1">
                        <label className="text-xs uppercase tracking-widest text-orange-600 font-bricolage group-focus-within:text-orange-300 transition-colors">
                          Your Rating
                        </label>
                      </div>
                      <div className="md:col-span-3 flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="transition-transform duration-200 hover:scale-125 focus:outline-none"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHover(star)}
                              onMouseLeave={() => setHover(0)}
                            >
                              <span className={`text-3xl ${(hover || rating) >= star ? "text-orange-500" : "text-gray-200"}`}>
                                ★
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Updated text logic to prioritize the hover value */}
                        <span className="ml-4 text-[10px] font-bold font-bricolage text-orange-600 uppercase tracking-widest min-w-[100px] mt-2">
                          {(hover || rating) === 5 && "Excellent"}
                          {(hover || rating) === 4 && "Great"}
                          {(hover || rating) === 3 && "Average"}
                          {(hover || rating) === 2 && "Poor"}
                          {(hover || rating) === 1 && "Terrible"}
                        </span>
                      </div>
                    </div>

                    {/* 2. Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 group">
                      <div className="md:col-span-1">
                        <label className="text-xs uppercase tracking-widest text-orange-600 font-bricolage group-focus-within:text-orange-300 transition-colors">
                          Full Name
                        </label>
                      </div>
                      <div className="md:col-span-3">
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          className="w-full px-0 py-2 border-b border-gray-200 font-bricolage focus:border-orange-500 outline-none transition-all bg-transparent font-thin placeholder:font-light placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    {/* 3. Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 group">
                      <div className="md:col-span-1">
                        <label className="text-xs uppercase tracking-widest text-orange-600 font-bricolage group-focus-within:text-orange-300 transition-colors">
                          Email Address
                        </label>
                      </div>
                      <div className="md:col-span-3">
                        <input
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-0 py-2 border-b font-bricolage border-gray-200 focus:border-orange-500 outline-none transition-all bg-transparent font-thin placeholder:font-light placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    {/* 4. Description/Experience Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4 group">
                      <div className="md:col-span-1 pt-2">
                        <label className="text-xs uppercase tracking-widest text-orange-600 font-bricolage group-focus-within:text-orange-300 transition-colors">
                          Review
                        </label>
                      </div>
                      <div className="md:col-span-3">
                        <textarea
                          rows="3"
                          placeholder="How was the product quality and delivery?"
                          className="w-full px-0 py-2 border-b font-bricolage border-gray-200 focus:border-orange-500 outline-none transition-all bg-transparent resize-none font-thin placeholder:font-light placeholder:text-gray-300 leading-relaxed"
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3">
                      <div className="md:col-start-2 md:col-span-3">
                        <button className="bg-orange-500 text-white px-12 py-4 rounded-lg hover:bg-red-500 transition-all duration-300 font-bold uppercase text-[12px] tracking-[0.2em]">
                          Post Review
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>

              {/* Published Reviews Section (Single Column / One row per review) */}
              <div className="border-t border-gray-100 pt-12">
                <div className="flex justify-between items-end mb-8">
                  <h3 className="text-2xl font-bold font-bricolage text-orange-600">Recent Feedback</h3>
                  <span className="text-gray-500 text-sm">Showing 4 of 124 reviews</span>
                </div>

                <div className="space-y-0"> {/* Stacked list */}
                  {[
                    { name: "Alex Johnson", score: 5, date: "Oct 12, 2025", text: "The camera quality on this device is absolutely breathtaking. Best purchase this year. The low light performance exceeded my expectations." },
                    { name: "Sarah Miller", score: 4, date: "Sep 28, 2025", text: "Very solid build quality. The shipping was fast, arriving in just 2 days. Docked one star because the charging cable is a bit short." },
                    { name: "Mike Ross", score: 5, date: "Aug 15, 2025", text: "The new titanium finish feels premium. It's much lighter than I expected! Highly recommend for anyone upgrading from an older model." },
                    { name: "Emma Wilson", score: 5, date: "July 02, 2025", text: "Customer support was very helpful when I had questions about the warranty. The product itself is flawless and very fast." }
                  ].map((rev, i) => (
                    <div key={i} className="py-8 border-b border-gray-100 last:border-0 group">
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">

                        {/* Left Side of Row: Metadata */}
                        <div className="w-full md:w-48 shrink-0">
                          <p className="font-bold text-gray-900 text-lg">{rev.name}</p>
                          <div className="text-orange-400 text-xs mt-1 flex gap-0.5">
                            {"★".repeat(rev.score)}{"☆".repeat(5 - rev.score)}
                          </div>
                          <p className="text-xs text-gray-400 font-medium mt-2 uppercase tracking-wider">{rev.date}</p>
                        </div>

                        {/* Right Side of Row: The Content */}
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed font-bricolage md:text-md">
                            "{rev.text}"
                          </p>
                          <div className="mt-4 flex items-center gap-4">
                            <button className="text-xs font-semibold text-gray-400 hover:text-orange-500 transition-colors">Helpful?</button>
                            <button className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors">Report</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                <div className="mt-10 text-center">
                  <button className="px-8 py-3 border border-gray-200 rounded-full text-sm font-bold hover:bg-gray-50 transition-all uppercase tracking-widest">
                    Load More Reviews
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* 4. BOUGHT TOGETHER - Elegant Refined Design */}
          {activeTab === "bought together" && (
            <div className="animate-fadeIn max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold font-bricolage text-orange-600 mb-2">Frequently Bought Together</h3>
                <p className="text-gray-500">Customers who bought this also added these to their cart</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((item) => (
                  <div key={item.Id} className="group flex flex-col transition-all duration-500">
                    {/* Image Container with Elegant Layered Border */}
                    <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-1 transition-all duration-500 mb-4">
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-white border border-gray-50 flex items-center justify-center p-6">
                        <img
                          src={item.ProductsImage}
                          alt={item.Name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />

                        {/* Elegant Light Overlay */}
                        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                          <button
                            onClick={() => navigate(`/product/${item.Id}`)}
                            className="bg-orange-500 text-white text-xs font-bold py-2.5 px-6 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-600 tracking-widest uppercase"
                          >
                            View Product
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="px-1 space-y-1">
                      <h4 className="font-bold text-black line-clamp-1 transition-colors duration-300">
                        {item.Name}
                      </h4>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em]">{item.Category}</p>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-black text-orange-500 tracking-tight">${item.Price}</span>
                        <button className="h-10 w-10 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-red-500 transition-all duration-300 shadow-sm">
                          <CartIcon size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Bundle Section - Refined colors */}
              <div className="mt-16 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex -space-x-5">
                  {relatedProducts.slice(0, 3).map((item) => (
                    <div key={item.Id} className="relative p-1 bg-white rounded-full shadow-sm border border-gray-100">
                      <img src={item.ProductsImage} className="w-16 h-16 rounded-full object-contain" alt="bundle" />
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-full border-4 border-white bg-orange-100 flex items-center justify-center text-orange-600 font-bold shadow-sm">+1</div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h4 className="text-xl font-bold text-gray-900 font-bricolage">Complete the Set & Save</h4>
                  <p className="text-sm text-gray-500 max-w-md">Add these curated essentials to your cart now and unlock an exclusive <span className="text-orange-600 font-bold">10% bundle discount</span>.</p>
                </div>

                <button className="w-full md:w-auto bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-500 transition-all duration-300">
                  ADD BUNDLE TO CART
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Policy Section - Below Tabs */}
        <div className="px-[8%] lg:px-[12%] py-16 border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

              {/* Shipping Policy */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                    <Truck size={24} />
                  </div>
                  <h2 className="font-bricolage text-2xl font-bold text-orange-600">Shipping Policy</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed font-bricolage text-sm md:text-base">
                  <p>
                    At our store, we prioritize efficiency to ensure your products reach you as quickly as possible. All standard orders are meticulously processed and prepared for shipment within <span className="font-bold text-gray-800">1–2 business days</span> of purchase confirmation.
                  </p>
                  <p>
                    Please note that our logistics team operates Monday through Friday. Consequently, any orders placed on weekends or during national holidays will be prioritized for processing on the <span className="font-bold text-gray-800">very next business day</span>.
                  </p>
                  <p className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-400 font-medium text-orange-700">
                    Bonus: We offer complimentary standard shipping on all domestic orders exceeding a total value of $50.
                  </p>
                </div>
              </div>

              {/* Returns Policy */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shadow-sm">
                    <RotateCcw size={24} />
                  </div>
                  <h2 className="font-bricolage text-2xl font-bold text-orange-600">Returns Policy</h2>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed font-bricolage text-sm md:text-base">
                  <p>
                    We stand by the quality of our electronics. However, if you are not entirely satisfied with your purchase, you are eligible to return the item for a full refund or exchange within <span className="font-bold text-gray-800">30 days</span> of the delivery date.
                  </p>
                  <p>
                    To maintain our high standards, returned items must be in their <span className="font-bold text-gray-800">original packaging, unused, and undamaged</span>. Items showing signs of wear may not be eligible for a full refund.
                  </p>
                  <p>
                    Once our warehouse receives and inspects the unit, your refund will be processed within 5-7 business days back to your original payment method.
                  </p>
                </div>
              </div>

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

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
          lastAddedAt={lastAddedAt}
          duration={5000}
        />
      </div>
    </>
  );
}

export default ProductDetails;
