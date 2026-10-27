import { pool } from "./pool.js";

const tours = [
  [
    "Santorini Sunset Escape",
    7,
    1890,
    "destination-santorini.jpg",
    "View of Santorini",
  ],
  [
    "Kyoto Temples & Tea",
    9,
    2900,
    "destination-kyoto.jpg",
    "Kyoto temple near a lake",
  ],
  [
    "Patagonia Trail Week",
    8,
    2100,
    "destination-patagonia.jpg",
    "Patagonia mountains and lake",
  ],
  [
    "Morocco Medina & Desert",
    6,
    1350,
    "destination-morocco.jpg",
    "Morocco by the ocean",
  ],
  [
    "Iceland Ring Road",
    10,
    2900,
    "destination-iceland.jpg",
    "Iceland Ring Road",
  ],
  [
    "Bali Slow Travel", 
    12, 
    1980, 
    "destination-bali.jpg", 
    "Bali beach"
  ],
];

try {
  for (const [title, days, price, file, alt] of tours) {
    await pool.query(
      `INSERT INTO tours(title,duration_days,price,image_file,image_alt)
      VALUES ($1,$2,$3,$4,$5) ON CONFLICT(title) DO UPDATE SET
      duration_days=EXCLUDED.duration_days, price=EXCLUDED.price,
      image_file=EXCLUDED.image_file,image_alt=EXCLUDED.image_alt`,
      [title, days, price, file, alt],
    );
  }
  console.log("Seeded 6 tours");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
