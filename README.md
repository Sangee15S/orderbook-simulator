# 📈 Real-Time Orderbook Viewer & Simulator

A powerful trading simulation tool built with **Next.js** that connects to live WebSocket feeds from **OKX**, **Bybit**, and **Deribit**. It enables users to visualize the orderbook in real time, simulate buy/sell orders, and analyze order impact with advanced metrics.

---

## 🚀 Features

### ✅ Core Features
- Real-time orderbook data from:
  - OKX
  - Bybit
  - Deribit
- Order Simulation Form (market orders)
- Venue switcher for dynamic platform selection
- Depth chart and orderbook visualization
- Responsive and modern UI (TailwindCSS)

### ⭐ Bonus Features
- Cumulative market depth visualization
- Order impact metrics:
  - Fill percentage
  - Slippage
  - Time to fill (placeholder for extension)
  - Market impact estimation
- Warning for large/slippage-prone orders
- Orderbook imbalance indicators (optional)
- Timing scenario comparison (optional)

---

## 🧱 Tech Stack

- **Next.js 15**
- **React**
- **Tailwind CSS**
- **Recharts** (for visualization)
- **WebSocket** APIs from OKX, Bybit, Deribit

---

## 📦 Installation

```bash
git clone https://github.com/Sangee15S/orderbook-simulator.git
cd real-time-orderbook
npm install
```
## 🏃‍♂️ Running Locally
npm run dev
The app will be available at http://localhost:3000

## 🛠 Project Structure
/components
  |- OrderSimulationForm.js
  |- OrderbookChart.js
  |- OrderMetricsCard.js
  |- VenueSwitcher.js
/pages
  |- index.js        # Main UI and logic
/utils
  |- websocketClients.js
  |- simulation.js   # Order matching and fill logic

## 🧰 Tech Stack
Tool	Purpose
Next.js	React framework
Tailwind CSS	Styling
Recharts	Data visualization
WebSocket	Real-time data streaming
uuid	Unique order ID generation
classnames	Conditional styling

## 📚 API Docs & Rate Limits
## OKX
Docs: https://www.okx.com/docs-v5/en/#websocket-api

Limits: 100 connections/IP, 2400 messages/min

## Bybit
Docs: https://bybit-exchange.github.io/docs/v5/websocket/public/orderbook

Limits: 50 connections/IP, 50 requests/sec

## Deribit
Docs: https://docs.deribit.com

Limits: 20 subscriptions/sec, 100 messages/sec

## 🧾 Example Metrics
When a user simulates an order:

📉 Fill %: How much of the order can be executed

💸 Slippage: Price deviation from expected entry

📊 Market Impact: Change in price if full order is executed

⏱️ Time to Fill: Currently mocked as a static range


## Author
SANGEETHA SHANMUGAM
