import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
});

// Ensure the table exists
async function ensureTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS download_counter (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    count INTEGER NOT NULL DEFAULT 0
  )`);
}

export default async function handler(req: any, res: any) {
  await ensureTable();
  const counterName = 'amverge_downloads';

  if (req.method === 'POST') {
    // Increment counter
    await pool.query(
      `INSERT INTO download_counter (name, count) VALUES ($1, 1)
       ON CONFLICT (name) DO UPDATE SET count = download_counter.count + 1`,
      [counterName]
    );
    const result = await pool.query('SELECT count FROM download_counter WHERE name = $1', [counterName]);
    return res.status(200).json({ value: result.rows[0].count });
  }

  if (req.method === 'GET') {
    // Get counter
    const result = await pool.query('SELECT count FROM download_counter WHERE name = $1', [counterName]);
    const value = result.rows[0]?.count ?? 0;
    return res.status(200).json({ value });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
