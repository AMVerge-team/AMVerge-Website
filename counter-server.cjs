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

const INITIAL_DOWNLOAD_COUNT = 10365;
const DOWNLOAD_COOLDOWN_MS = 30 * 60 * 1000;
const downloadIncrementCooldownByIp = new Map();

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS download_counter (
      name TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT ${INITIAL_DOWNLOAD_COUNT}
    )
  `);

  await pool.query(`
    INSERT INTO download_counter (name, count)
    VALUES ('amverge_downloads', ${INITIAL_DOWNLOAD_COUNT})
    ON CONFLICT (name)
    DO UPDATE SET count = GREATEST(download_counter.count, ${INITIAL_DOWNLOAD_COUNT})
  `);
}

app.get("/count", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT count FROM download_counter WHERE name = $1",
      ["amverge_downloads"]
    );

    const count = Math.max(
      INITIAL_DOWNLOAD_COUNT,
      Number(result.rows[0]?.count ?? INITIAL_DOWNLOAD_COUNT)
    );
    res.json({ value: count });
  } catch (err) {
    console.error("GET /count error:", err);
    res.status(500).json({ error: "Failed to get count" });
  }
});

app.post("/increment", async (req, res) => {
  try {
    const now = Date.now();
    if (downloadIncrementCooldownByIp.size > 5000) {
      for (const [ipKey, expiresAt] of downloadIncrementCooldownByIp) {
        if (now >= expiresAt) downloadIncrementCooldownByIp.delete(ipKey);
      }
    }
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    const cooldownUntil = downloadIncrementCooldownByIp.get(clientIp) || 0;
    if (now < cooldownUntil) {
      const current = await pool.query(
        "SELECT count FROM download_counter WHERE name = $1",
        ["amverge_downloads"]
      );
      const count = Math.max(
        INITIAL_DOWNLOAD_COUNT,
        Number(current.rows[0]?.count ?? INITIAL_DOWNLOAD_COUNT)
      );
      res.json({ value: count, cooldown: true });
      return;
    }
    downloadIncrementCooldownByIp.set(clientIp, now + DOWNLOAD_COOLDOWN_MS);

    const result = await pool.query(
      `
      INSERT INTO download_counter (name, count)
      VALUES ($1, $2)
      ON CONFLICT (name)
      DO UPDATE SET count = GREATEST(download_counter.count, $3) + 1
      RETURNING count
      `,
      ["amverge_downloads", INITIAL_DOWNLOAD_COUNT + 1, INITIAL_DOWNLOAD_COUNT]
    );

    res.json({ value: Number(result.rows[0].count) });
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