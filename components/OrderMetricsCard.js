// components/OrderMetricsCard.js
export default function OrderMetricsCard({ metrics }) {
  if (!metrics) return null;

  const { fillPercent, slippage, marketImpact, avgFillPrice, timeToFill } = metrics;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Order Impact Metrics</h3>
      <ul className="space-y-1">
        <li>📊 Fill %: <strong>{fillPercent.toFixed(2)}%</strong></li>
        <li>💸 Slippage: <strong>{slippage.toFixed(2)}</strong></li>
        <li>📉 Market Impact: <strong>{marketImpact.toFixed(2)}</strong></li>
        <li>📈 Avg Fill Price: <strong>{avgFillPrice.toFixed(2)}</strong></li>
        <li>⏱️ Time to Fill: <strong>{timeToFill} ms</strong></li>
      </ul>
    </div>
  );
}
