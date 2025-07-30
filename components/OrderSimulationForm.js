// components/OrderSimulationForm.js

// Import React hook for managing component state
import { useState } from 'react';

// OrderSimulationForm accepts a prop `onSimulate` which is called on form submit
export default function OrderSimulationForm({ onSimulate }) {
  // State for form inputs
  const [orderType, setOrderType] = useState('market');  // 'market' or 'limit'
  const [side, setSide] = useState('buy');               // 'buy' or 'sell'
  const [quantity, setQuantity] = useState(0.1);         // order quantity
  const [price, setPrice] = useState('');                // price for limit order

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default page reload
    onSimulate({
      orderType,
      side,
      quantity: parseFloat(quantity), // Convert string to number
      price: price ? parseFloat(price) : null, // Null for market order
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md mb-4">
      {/* Container for all form inputs */}
      <div className="flex flex-col gap-4">
        {/* Row for Order Type and Side */}
        <div className="flex gap-4">
          {/* Dropdown for selecting Order Type */}
          <label className="flex items-center gap-2">
            <span>Order Type:</span>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="border rounded p-1"
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </select>
          </label>

          {/* Dropdown for selecting Buy or Sell side */}
          <label className="flex items-center gap-2">
            <span>Side:</span>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="border rounded p-1"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>
        </div>

        {/* Input field for quantity */}
        <label className="flex items-center gap-2">
          <span>Quantity:</span>
          <input
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="border rounded p-1 w-24"
          />
        </label>

        {/* Input field for price (only if order type is 'limit') */}
        {orderType === 'limit' && (
          <label className="flex items-center gap-2">
            <span>Price:</span>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border rounded p-1 w-24"
            />
          </label>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mt-2"
        >
          Simulate Order
        </button>
      </div>
    </form>
  );
}
