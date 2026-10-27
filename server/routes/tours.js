import { Router } from "express";
import { pool } from "../db/pool.js";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id,title,description,duration_days,price::float8 AS price,image_file,image_alt FROM tours ORDER BY id",
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
