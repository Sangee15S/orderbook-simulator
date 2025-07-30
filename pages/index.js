// pages/index.js
import { useEffect, useState } from 'react';
import { connectToOKX, connectToBybit, connectToDeribit } from '../utils/websocketClients';
import OrderbookChart from '../components/OrderBookChart';
import VenueSwitcher from '../components/VenueSwitcher';
import OrderSimulationForm from '../components/OrderSimulationForm';
import OrderMetricsCard from '../components/OrderMetricsCard';

export default function Home() {
  // State for selected exchange venue
  const [venue, setVenue] = useState('OKX');

  // State for storing real-time orderbook data (bids & asks)
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });

  // Stores the simulated order metrics like fill %, slippage, etc.
  const [metrics, setMetrics] = useState(null);

  // Track the current WebSocket connection so we can clean it up on venue change
  const [wsInstance, setWsInstance] = useState(null);

  // Effect to connect to the appropriate WebSocket when the selected venue changes
  useEffect(() => {
    // Close the previous WebSocket connection if any
    if (wsInstance) wsInstance.close();

    let ws;

    // Connect to appropriate exchange WebSocket based on selected venue
    if (venue === 'OKX') {
      ws = connectToOKX('BTC-USDT', setOrderbook);
    } else if (venue === 'Bybit') {
      ws = connectToBybit('BTCUSDT', setOrderbook);
    } else if (venue === 'Deribit') {
      ws = connectToDeribit('BTC-PERPETUAL', setOrderbook);
    }

    // Store the new WebSocket instance
    setWsInstance(ws);

    // Cleanup WebSocket connection on component unmount or venue change
    return () => ws?.close();
  }, [venue]);

  // Simulates an order execution based on user input and orderbook data
  const simulateOrder = ({ orderType, side, quantity, price }) => {
    const book = side === 'buy' ? orderbook.asks : orderbook.bids;

    let remainingQty = quantity;
    let totalCost = 0;
    let totalQtyFilled = 0;
    let levelsUsed = 0;

    for (const level of book) {
      const [levelPrice, levelQty] = [level.price, level.quantity];

      // For limit orders, skip prices outside user-specified limit
      if (orderType === 'limit') {
        if (side === 'buy' && levelPrice > price) break;
        if (side === 'sell' && levelPrice < price) break;
      }

      // Fill as much quantity as available at this level
      const fillQty = Math.min(remainingQty, levelQty);
      totalCost += fillQty * levelPrice;
      totalQtyFilled += fillQty;
      remainingQty -= fillQty;
      levelsUsed++;

      if (remainingQty <= 0) break;
    }

    // Calculate simulation metrics
    const avgFillPrice = totalQtyFilled > 0 ? totalCost / totalQtyFilled : 0;
    const slippage =
      orderType === 'market' && book[0]
        ? Math.abs(book[0].price - avgFillPrice)
        : 0;

    const fillPercent = (totalQtyFilled / quantity) * 100;
    const marketImpact = levelsUsed;
    const timeToFill = Math.round(Math.random() * 1000); // Simulated fill time

    // Update metrics state for display
    setMetrics({
      fillPercent,
      slippage,
      marketImpact,
      avgFillPrice,
      timeToFill,
    });
  };

  // Debugging: log orderbook updates
  console.log("📊 DepthChart Bids:", orderbook.bids);
  console.log("📊 DepthChart Asks:", orderbook.asks);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Real-Time Orderbook Viewer & Simulator
      </h1>

      {/* Exchange Venue Selector */}
      <VenueSwitcher selectedVenue={venue} setSelectedVenue={setVenue} />

      {/* Simulation form and output side-by-side */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 items-start">
        <div className="w-full md:w-1/2">
          {/* Form to enter order simulation inputs */}
          <OrderSimulationForm onSimulate={simulateOrder} />
        </div>
        <div className="w-full md:w-1/2">
          {/* Display calculated order impact metrics */}
          <OrderMetricsCard metrics={metrics} />
        </div>
      </div>

      {/* Chart rendering orderbook depth */}
      <div className="mt-8">
        <OrderbookChart bids={orderbook.bids} asks={orderbook.asks} />
      </div>
    </div>
  );
}
