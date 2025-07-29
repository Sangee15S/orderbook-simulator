// components/OrderSimulationForm.js
import { useState } from 'react';

export default function OrderSimulationForm({ onSimulate }) {
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('buy');
  const [quantity, setQuantity] = useState(0.1);
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate({
      orderType,
      side,
      quantity: parseFloat(quantity),
      price: price ? parseFloat(price) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md mb-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
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
