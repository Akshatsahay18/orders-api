const axios = require('axios');
const express = require('express');
const app = express();

// Upstream dependencies (resolved from these env URLs):
const ORDERS_DB_URL = process.env.ORDERS_DB_URL;   // orders-db
const PAYMENTS_URL  = process.env.PAYMENTS_URL;    // payments-api
const INVENTORY_URL = process.env.INVENTORY_URL;   // inventory-api

app.get('/orders', async (req, res) => {
  // orders-api -> orders-db : GET /orders/row
  const rows = await axios.get(`${ORDERS_DB_URL}/orders/row`);
  res.json(rows.data);
});

app.post('/orders', async (req, res) => {
  // orders-api -> inventory-api : GET /stock  (check availability)
  await axios.get(`${INVENTORY_URL}/stock`);
  // orders-api -> payments-api : POST /charge (take payment)
  const pay = await axios.post(`${PAYMENTS_URL}/charge`, { amount: 100 });
  // orders-api -> orders-db : persist the order
  await axios.post(`${ORDERS_DB_URL}/orders/row`, { paid: pay.data });
  res.json({ ok: true });
});

app.listen(3000, () => console.log('orders-api on :3000'));
