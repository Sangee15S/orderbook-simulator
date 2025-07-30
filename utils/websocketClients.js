// utils/websocketClients.js

// Establishes a WebSocket connection to OKX for real-time order book data
export function connectToOKX(symbol = 'BTC-USDT', onData) {
  const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');

  ws.onopen = () => {
    // Subscribe to the order book channel for the given symbol
    const subscribeMsg = {
      op: 'subscribe',
      args: [{
        channel: 'books',
        instId: symbol,
      }]
    };
    ws.send(JSON.stringify(subscribeMsg));
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    // Check if it's a valid order book update
    if (msg.arg?.channel === 'books' && msg.data?.length) {
      const orderbook = msg.data[0];

      // Extract top 15 bids and asks and convert to float
      const bids = orderbook.bids.slice(0, 15).map(([price, qty]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty),
      }));
      const asks = orderbook.asks.slice(0, 15).map(([price, qty]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty),
      }));

      // Pass the processed order book data to the handler
      onData({ bids, asks });
    }
  };

  ws.onerror = (err) => console.error('OKX WebSocket error:', err);
  ws.onclose = () => console.log('OKX WebSocket closed');

  return ws;
}

// utils/websocketClients.js

// Establishes a WebSocket connection to Bybit's public spot market feed
export function connectToBybit(symbol = 'BTCUSDT', onData) {
  const ws = new WebSocket('wss://stream.bybit.com/v5/public/spot');

  ws.onopen = () => {
    // Subscribe to the order book channel for the specified symbol
    const msg = {
      op: 'subscribe',
      args: [`orderbook.50.${symbol}`],
    };
    ws.send(JSON.stringify(msg));
  };

  ws.onmessage = (event) => {
    const res = JSON.parse(event.data);

    // Validate and parse the order book data
    if (res.topic?.startsWith('orderbook.50') && res.data) {
      const orderbook = res.data;

      const bids = (orderbook.b || []).slice(0, 15).map(([price, qty]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty),
      }));

      const asks = (orderbook.a || []).slice(0, 15).map(([price, qty]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty),
      }));

      // Pass the processed data to the callback
      onData({ bids, asks });
    }
  };

  ws.onerror = (err) => console.error('Bybit WebSocket error:', err);
  ws.onclose = () => console.log('Bybit WebSocket closed');

  return ws;
}


// lib/deribitSocket.js



// Connects to Deribit WebSocket for real-time order book updates
export function connectToDeribit(symbol = 'BTC-PERPETUAL', onData) {
  const ws = new WebSocket('wss://www.deribit.com/ws/api/v2');

  ws.onopen = () => {
    // Subscribe to the book update channel with 20 levels and 100ms frequency
    const subscribeMsg = {
      jsonrpc: "2.0",
      id: 1,
      method: "public/subscribe",
      params: {
        channels: [`book.${symbol}.none.20.100ms`] // Format: book.<symbol>.<interval>.<depth>.<frequency>
      }
    };
    ws.send(JSON.stringify(subscribeMsg));
  };

  ws.onmessage = (event) => {
    const res = JSON.parse(event.data);
    const update = res.params?.data;

    // Ensure it's a valid book update with bids and asks
    if (res.method === 'subscription' && update?.bids && update?.asks) {
      const bids = update.bids.slice(0, 15).map(([price, qty]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty),
      }));
      const asks = update.asks.slice(0, 15).map(([price, qty]) => ({
        price: parseFloat(price),
        quantity: parseFloat(qty),
      }));
      onData({ bids, asks });
    }
  };

  ws.onerror = (err) => console.error('Deribit WebSocket error:', err);
  ws.onclose = () => console.log('Deribit WebSocket closed');

  return ws;
}


