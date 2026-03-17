import react, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Index from "./components/pages/Index";
import ProductDetails from "./components/pages/ProductDetails";
import Wishlist from "./components/pages/Wishlist";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import Footer from "./components/footer/Footer";
import About from "./components/pages/About";
import Shop from "./components/pages/Shop";
import Blog from "./components/pages/Blog";
import FAQ from "./components/pages/FAQ";
import Contact from "./components/pages/Contact";
import BackToTop from "./components/additions/BackToTop";
import ScrollToTop from "./components/functions/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Nav />
        <BackToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
