const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-vercel-domain.vercel.app"
  ]
}));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS download_counter (
      name TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `);

  await pool.query(`
    INSERT INTO download_counter (name, count)
    VALUES ('amverge_downloads', 0)
    ON CONFLICT (name) DO NOTHING
  `);
}

app.get("/count", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT count FROM download_counter WHERE name = $1",
      ["amverge_downloads"]
    );

    res.json({ value: result.rows[0]?.count ?? 0 });
  } catch (err) {
    console.error("GET /count error:", err);
    res.status(500).json({ error: "Failed to get count" });
  }
});

app.post("/increment", async (req, res) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO download_counter (name, count)
      VALUES ($1, 1)
      ON CONFLICT (name)
      DO UPDATE SET count = download_counter.count + 1
      RETURNING count
      `,
      ["amverge_downloads"]
    );

    res.json({ value: result.rows[0].count });
  } catch (err) {
    console.error("POST /increment error:", err);
    res.status(500).json({ error: "Failed to increment count" });
  }
});

const port = process.env.PORT || 3001;

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Counter API running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database init failed:", err);
    process.exit(1);
  });