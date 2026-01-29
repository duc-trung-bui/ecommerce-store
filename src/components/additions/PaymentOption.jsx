import React from "react";

function PaymentOption({ id, label, selectedPayment, setSelectedPayment, children }) {
  const isSelected = selectedPayment === id;

  const handleSelect = () => {
    setSelectedPayment(id);
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <label className="flex items-center gap-3 cursor-pointer">
        <input 
          type="radio" 
          name="payment" 
          checked={isSelected} 
          onChange={handleSelect}
          className="accent-orange-400"
        />
        <span className="text-sm font-medium">{label}</span>
      </label>

      {/* Expanded section */}
      {isSelected && (
        <div className="mt-3 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export default PaymentOption;
