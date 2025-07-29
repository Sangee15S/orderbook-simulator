// components/OrderbookChart.js
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

export default function OrderbookChart({ bids = [], asks = [] }) {
  const formattedBids = [...bids].reverse();
  const formattedAsks = [...asks];

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Orderbook Depth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={formattedBids.concat(formattedAsks)}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="price" type="category" width={80} />
          <Tooltip />
          <Bar dataKey="quantity" fill="#82ca9d">
            <LabelList dataKey="quantity" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
