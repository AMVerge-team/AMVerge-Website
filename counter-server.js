const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const COUNTER_FILE = './counter.json';

app.use(cors());
app.use(express.json());

// Helper to read/write count
function getCount() {
  try {
    const data = fs.readFileSync(COUNTER_FILE, 'utf8');
    return JSON.parse(data).count || 0;
  } catch {
    return 0;
  }
}
function setCount(count) {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }), 'utf8');
}

// Get current count
app.get('/api/downloads', (req, res) => {
  res.json({ value: getCount() });
});

// Increment and return new count
app.post('/api/downloads/up', (req, res) => {
  let count = getCount() + 1;
  setCount(count);
  res.json({ value: count });
});

app.listen(PORT, () => {
  console.log(`Counter API running on port ${PORT}`);
});