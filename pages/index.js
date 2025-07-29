// pages/index.js
import { useEffect, useState } from 'react';
import { connectToOKX, connectToBybit, connectToDeribit } from '../utils/websocketClients';
import OrderbookChart from '../components/OrderBookChart';
import VenueSwitcher from '../components/VenueSwitcher';
import OrderSimulationForm from '../components/OrderSimulationForm';
import OrderMetricsCard from '../components/OrderMetricsCard';

export default function Home() {
  const [venue, setVenue] = useState('OKX');
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });
  const [metrics, setMetrics] = useState(null);
  const [wsInstance, setWsInstance] = useState(null);

  useEffect(() => {
    if (wsInstance) wsInstance.close();

    let ws;
    if (venue === 'OKX') {
      ws = connectToOKX('BTC-USDT', setOrderbook);
    } else if (venue === 'Bybit') {
      ws = connectToBybit('BTCUSDT', setOrderbook);
    } else if (venue === 'Deribit') {
      ws = connectToDeribit('BTC-PERPETUAL', setOrderbook);
    }

    setWsInstance(ws);
    return () => ws?.close();
  }, [venue]);

  const simulateOrder = ({ orderType, side, quantity, price }) => {
    const book = side === 'buy' ? orderbook.asks : orderbook.bids;
    let remainingQty = quantity;
    let totalCost = 0;
    let totalQtyFilled = 0;
    let levelsUsed = 0;

    for (const level of book) {
      const [levelPrice, levelQty] = [level.price, level.quantity];

      if (orderType === 'limit') {
        if (side === 'buy' && levelPrice > price) break;
        if (side === 'sell' && levelPrice < price) break;
      }

      const fillQty = Math.min(remainingQty, levelQty);
      totalCost += fillQty * levelPrice;
      totalQtyFilled += fillQty;
      remainingQty -= fillQty;
      levelsUsed++;

      if (remainingQty <= 0) break;
    }

    const avgFillPrice = totalQtyFilled > 0 ? totalCost / totalQtyFilled : 0;
    const slippage =
      orderType === 'market' && book[0]
        ? Math.abs(book[0].price - avgFillPrice)
        : 0;

    const fillPercent = (totalQtyFilled / quantity) * 100;
    const marketImpact = levelsUsed;
    const timeToFill = Math.round(Math.random() * 1000); // Simulated

    setMetrics({
      fillPercent,
      slippage,
      marketImpact,
      avgFillPrice,
      timeToFill,
    });
  };
console.log("📊 DepthChart Bids:", orderbook.bids);
console.log("📊 DepthChart Asks:", orderbook.asks);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Real-Time Orderbook Viewer & Simulator</h1>

      <VenueSwitcher selectedVenue={venue} setSelectedVenue={setVenue} />

      <div className="flex flex-col md:flex-row gap-4 mt-6 items-start">
  <div className="w-full md:w-1/2">
    <OrderSimulationForm onSimulate={simulateOrder} />
  </div>
  <div className="w-full md:w-1/2">
    <OrderMetricsCard metrics={metrics} />
  </div>
</div>

      <div className="mt-8">
        <OrderbookChart bids={orderbook.bids} asks={orderbook.asks} />
      </div>
    </div>
  );
}
