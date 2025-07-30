import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function OrderbookChart({ bids = [], asks = [] }) {
  const formattedBids = [...bids].reverse().map((item) => ({
    price: item.price,
    bidSize: item.quantity,
    askSize: 0,
  }));

  const formattedAsks = [...asks].map((item) => ({
    price: item.price,
    bidSize: 0,
    askSize: item.quantity,
  }));

  const combinedData = formattedBids.concat(formattedAsks);

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Orderbook Depth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={combinedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="price" type="category" width={80} />
          <Tooltip />

          {/* Green for bids */}
          <Bar dataKey="bidSize" fill="green">
            <LabelList dataKey="bidSize" position="right" />
          </Bar>

          {/* Red for asks */}
          <Bar dataKey="askSize" fill="red">
            <LabelList dataKey="askSize" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
