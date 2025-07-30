// components/OrderMetricsCard.js

// Functional component to display calculated order simulation metrics
// Accepts a 'metrics' object as a prop
export default function OrderMetricsCard({ metrics }) {
  // If metrics are not available yet (null/undefined), do not render anything
  if (!metrics) return null;

  // Destructure individual metrics from the passed-in object
  const { fillPercent, slippage, marketImpact, avgFillPrice, timeToFill } = metrics;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      {/* Card title */}
      <h3 className="text-lg font-semibold mb-2">Order Impact Metrics</h3>

      {/* Render a list of metric values with icons and formatting */}
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
