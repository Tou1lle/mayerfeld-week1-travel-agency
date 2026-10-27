import { Router } from "express";
import bcrypt from "bcryptjs";
import passport from "../config/passport.js";
import { pool } from "../db/pool.js";

const router = Router();
const publicUser = (user) => ({ id: user.id, email: user.email });
const valid = (email, password) =>
  typeof email === "string" &&
  email.length <= 255 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
  typeof password === "string" &&
  password.length >= 8 &&
  password.length <= 128;
const establish = (req, res, next, user, status = 200) => {
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(status).json({ user: publicUser(user) });
    });
  });
};

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body ?? {};
  if (!valid(email, password))
    return res
      .status(400)
      .json({ error: "Valid email and password of 8–128 characters required" });
  try {
    const hash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      "INSERT INTO users(email,password_hash) VALUES ($1,$2) RETURNING id,email",
      [email.trim().toLowerCase(), hash],
    );
    establish(req, res, next, rows[0], 201);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email already registered" });
    next(err);
  }
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({ error: "Email and password required" });
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    establish(req, res, next, user);
  })(req, res, next);
});

router.get("/me", (req, res) =>
  res.json({ user: req.user ? publicUser(req.user) : null }),
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("wayfarer.sid", {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      res.json({ user: null });
    });
  });
});

export default router;
