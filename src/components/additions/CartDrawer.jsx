import React, { useEffect, useState, startTransition } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, lastAddedAt, onClose, cartItems, onUpdateQuantity, onRemove, duration = 5000 }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false); // Added: Pause when user is looking at the cart
  const navigate = useNavigate();

  useEffect(() => {
    // If the drawer is closed, don't do anything to the progress yet.
    // This prevents the "jump" to 100% while the slide-out animation is playing.
    if (!isOpen) return;

    // Reset progress to 100 only when the drawer is freshly opened
    startTransition(() => {
      setProgress(100);
    })

    const intervalTime = 10;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            // Wait for the bar to visually hit 0, then close
            setTimeout(() => {
              onClose();
            }, 100);
            return 0;
          }
          return prev - step;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, lastAddedAt, duration, onClose, isPaused]);

  const total = cartItems.reduce((acc, item) => acc + (item.Price * item.quantity), 0);

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-[99]" onClick={onClose} />}

      {/* Side Drawer */}
      <div
        onMouseEnter={() => setIsPaused(true)}   // Added: Pause timer
        onMouseLeave={() => setIsPaused(false)}  // Added: Resume timer
        className={`fixed top-0 right-0 h-full w-full md:w-1/4 bg-white z-[100] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* Progress Bar Container */}
        <div className="h-1 bg-gray-100 w-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${progress}%`,
              transition: 'none' // Added: Follow JS logic exactly without CSS lag
            }}
          />
        </div>

        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-green-600">✅ Added to Cart!</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={24} /></button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto space-y-4 cart-items-container">
            {cartItems.map((item) => (
              <div key={item.Id} className="flex gap-4 border-b pb-4">
                <img src={item.ProductsImage} alt={item.Name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-1">{item.Name}</h4>
                  <p className="text-orange-500 font-bold">${item.Price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border rounded-lg">
                      <button onClick={() => onUpdateQuantity(item.Id, -1)} className="p-1"><Minus size={14} /></button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.Id, 1)} className="p-1"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => onRemove(item.Id)} className="text-red-500 ml-auto"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                onClose(); // Close the drawer first
                navigate('/cart'); // Navigate to the cart page
              }}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-red-500 transition">
              View Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;