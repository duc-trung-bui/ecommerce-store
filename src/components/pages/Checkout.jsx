import React, { useEffect, useState, startTransition } from 'react';
import PaymentOption from '../additions/PaymentOption';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    startTransition(() => {
      const storedCart = JSON.parse(localStorage.getItem('cartItems'));
      const storedDiscount = parseFloat(localStorage.getItem("discount")) || 0;

      const updatedCart = storedCart.map(item => ({
        ...item,
        Price: parseFloat(item.Price), 
        quantity: item.quantity || 1,
      }));

      setDiscount(storedDiscount);
      setCart(updatedCart);
    });
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);
  const shipping = cart.length ? 300 : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - discountAmount;

  return (
    <>
      <div className="min-h-screen px-[8%] lg:px-[12%] py-14 bg-white text-gray-800">
        <h1 className="text-5xl font-bricolage font-semibold text-center mb-10">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Billing Section */}
          <div className="lg:col-span-2 bg-white p-8 border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input type="text" placeholder="Jack" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input type="text" placeholder="Waley" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name (Optional)</label>
                <input type="text" placeholder="Company Name" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Country *</label>
                <select className="w-full border rounded-md px-4 py-2">
                  <option>Select Country</option>
                  <option>Canada</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street Address *</label>
                <input type="text" placeholder="470 Lury Forks" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Apt, Suit, Etc. *</label>
                <input type="text" placeholder="YC7B 7UT" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input type="text" placeholder="London" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Post Code / Zip *</label>
                <input type="text" placeholder="9999" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">State *</label>
                <select className="w-full border rounded-md px-4 py-2">
                  <option>Select State</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input type="text" placeholder="jackwayley@gmail.com" className="w-full border rounded-md px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input type="text" placeholder="+1 (062) 109-9222" className="w-full border rounded-md px-4 py-2" />
              </div>
            </form>
            {/* Additional Options */}
            <div className="mt-6 space-y-4">
              <label className="flex items-center text-sm gap-2">
                <input type="checkbox" className="accent-orange-400" />
                Create an Account?
              </label>
              <label className="flex items-center text-sm gap-2">
                <input type="checkbox" className="accent-orange-400" />
                Ship to a Different Address?
              </label>
              <div>
                <label className="block text-sm font-medium mb-1">Order Note</label>
                <textarea 
                  className="w-full border rounded-md px-4 py-3 min-h-[100px]"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                ></textarea>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="bg-gray-50 p-8 rounded-xl border h-fit shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Your Order</h2>

            <div className="space-y-3 text-sm">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>{item.Name} x {item.quantity}</span>
                  <span>${(item.Price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Discount</span>
                <span className="text-green-600">- ${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Total</span>
                <span>- ${total.toFixed(2)}</span>
              </div>
            </div>
            {/* Payment Options */}
            <div className="mt-6 space-y-3">
              <PaymentOption 
                id="bank" 
                label="Direct Bank Transfer"
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
              >
                <div className="text-xs text-gray-600 ml-6">
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.  
                </div>
              </PaymentOption>
              <PaymentOption 
                id="check" 
                label="Check Payments"
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
              >
                <div className="text-xs text-gray-600 ml-6">
                  Please send a check to Store Name, 1234 Street Address, City, Country.
                </div>
              </PaymentOption>
              <PaymentOption 
                id="cash" 
                label="Cash on Delivery"
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
              >
                <div className="text-xs text-gray-600 ml-6">
                  Pay with cash upon delivery.
                </div>
              </PaymentOption>
              <PaymentOption 
                id="paypal" 
                label="PayPal"
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
              />
            </div>
            {/* Terms */}
            <div className="mt-6 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="accent-orange-400 mt-1" required />
                <span>
                  I have read and agree to the store's{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    terms and conditions
                  </span>
                </span>
              </label>
            </div>
            {/* Place Order Button */}
            <button className="w-full bg-orange-400 text-white py-3 rounded-md font-semibold hover:bg-orange-500 transition mt-6">
              Place Your Order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
