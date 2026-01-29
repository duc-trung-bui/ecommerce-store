import React, { useEffect, useState, startTransition } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import {
  X as CloseIcon,
  ShoppingCart as CartIcon,
  Trash2
} from 'lucide-react';

function Cart() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    startTransition(() => {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const fixedCart = storedCart.map(item => ({
        ...item,
        Price: parseFloat(item.Price),
        quantity: item.quantity || 1
      }));
      setCart(fixedCart);
    });
  }, [])

  const updatedQuantity = (id, delta) => {
    const updatedCart = cart.map(item => {
      if (item.Id === id) {
        const newQuantity = item.quantity + delta;

        if (newQuantity < 1) return item;

        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Red for delete
      cancelButtonColor: "#3085d6", // Blue for cancel
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic moves inside here
        const updatedCart = cart.filter((item) => item.Id !== id);
        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
        toast.success("Item removed from cart");
      }
    });
  };

  const clearCart = () => {
    if (cart.length === 0) return;

    Swal.fire({
      title: "Clear your cart?",
      text: "This will remove all items from your shopping cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]); // Clear state
        localStorage.setItem("cartItems", JSON.stringify([])); // Clear storage
        window.dispatchEvent(new Event("storage"));
        toast.info("Cart cleared successfully");
      }
    });
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "FREESHIP10") {
      setDiscount(10);
      localStorage.setItem("discount", "10");
      toast.success("Coupon applied: 10% off");
    } else {
      setDiscount(0);
      localStorage.removeItem("discount");
      toast.error("Invalid coupon code");
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.Price * item.quantity, 0);
  const shipping = cart.length ? 300 : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - discountAmount;

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className="px-4 sm:px-8 lg:px-[12%] py-12 bg-gray-50 text-gray-800 min-h-screen">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600 font-bricolage">
          My Shopping Cart
        </h1>
        <ToastContainer position="top-right" autoClose={1500} />
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-6">
            <thead>
              <tr className="text-sm text-gray-500 border-b border-gray-200">
                <tr></tr>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.Id} className="bg-white border rounded-xl shadow-sm">
                  <td className="text-center">
                    <button onClick={() => removeFromCart(item.Id)} className="text-xl text-gray-400 hover:text-red-500">
                      <CloseIcon size={16} className="inline-block" />
                    </button>
                  </td>
                  <td className="flex items-center gap-4 py-4 px-2">
                    <Link to={`/product/${item.Id}`}>
                      <img
                        src={item.ProductsImage}
                        alt={item.Name}
                        className="w-24 h-24 object-contain border p-2 rounded-lg hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {/* Product Name as Link */}
                        <Link to={`/product/${item.Id}`} className="hover:text-orange-600 transition-colors">
                          {item.Name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">{item.Category}</p>
                    </div>
                  </td>
                  <td className="text-center text-gray-800 font-medium">${item.Price.toFixed(2)}</td>
                  <td className="text-center">
                    <div className="inline-flex items-center border rounded overflow-hidden">
                      <button onClick={() => updatedQuantity(item.Id, -1)} className="px-3 py-1 hover:bg-gray-200">-</button>
                      <div className="px-4 font-medium">{item.quantity}</div>
                      <button onClick={() => updatedQuantity(item.Id, 1)} className="px-3 py-1 hover:bg-gray-200">+</button>
                    </div>
                  </td>
                  <td className="text-center text-gray-800 font-semibold">${(item.Price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}

              {cart.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-800">
                    <CartIcon size={24} className="inline-block mb-[2.5px]" />
                    <span className="ml-2">Your cart is empty!</span>
                  </td>
                </tr>

              )}
            </tbody>
          </table>
        </div>
        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {cart.map(item => (
            <div key={item.Id} className="bg-white border rounded-xl shadow-sm p-4">

              {/* Header + Remove Button */}
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {/* Product Name as Link */}
                  <Link to={`/product/${item.Id}`} className="hover:text-orange-600 transition-colors">
                    {item.Name}
                  </Link>
                </h3>

                <button
                  onClick={() => removeFromCart(item.Id)}
                  className="text-xl text-gray-400 hover:text-red-500"
                  title="Remove"
                >
                  <CloseIcon size={16} className="inline-block" />
                </button>
              </div>

              {/* Image */}
              <div className="mt-4">
                <img
                  src={item.ProductsImage}
                  alt={item.Name}
                  className="w-full h-auto object-contain border p-2 rounded-lg"
                />
              </div>

              {/* Category + Price */}
              <div className="mt-4 space-y-1 text-sm">
                <p className="text-sm text-gray-500">{item.Category}</p>
                <p className="text-gray-800 text-base font-semibold mt-1">
                  ${item.Price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">Quantity</p>

                <div className="inline-flex items-center border rounded overflow-hidden">
                  <button
                    onClick={() => updatedQuantity(item.Id, -1)}
                    className="px-3 py-1 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="px-4 font-medium">{item.quantity}</div>
                  <button
                    onClick={() => updatedQuantity(item.Id, 1)}
                    className="px-3 py-1 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-semibold text-gray-800">
                  ${(item.Price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="bg-white border rounded-xl shadow-sm p-4 text-center">
              <CartIcon size={24} className="inline-block mb-[2.5px]" />
              <span className="ml-2">Your cart is empty!</span>
            </div>
          )}
        </div>

        {/* Coupon Section & Clear Cart */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-8">

          {/* Left Side: Coupon Form */}
          <div className="w-full md:w-1/2 flex">
            <input
              type="text"
              placeholder="Enter coupon code (e.g. freeship10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border px-4 w-full rounded-l-md outline-none text-gray-700 h-10"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-gray-800 text-white px-6 rounded-r-md hover:bg-gray-700 transition h-10 font-medium"
            >
              Apply
            </button>
          </div>

          {/* Right Side: Clear Cart Button */}
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-6 py-2 text-white border bg-red-500 rounded-md hover:bg-red-600 transition h-10 font-medium w-full md:w-auto justify-center"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          )}
        </div>
        {/* Cart Totals */}
        <div className="mt-12 md:w-1/3 ml-auto border rounded-lg p-6 shadow bg-white">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Cart Totals</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2 text-green-600 font-medium">
              <span>Discount</span>
              <span>- ${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
