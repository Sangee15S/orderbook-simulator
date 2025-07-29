// components/VenueSwitcher.js

export default function VenueSwitcher({ selectedVenue, setSelectedVenue }) {
  const venues = ['OKX', 'Bybit', 'Deribit'];

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Select Exchange
      </label>
      <select
        value={selectedVenue}
        onChange={(e) => setSelectedVenue(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full max-w-xs"
      >
        {venues.map((venue) => (
          <option key={venue} value={venue}>
            {venue}
          </option>
        ))}
      </select>
    </div>
  );
}
