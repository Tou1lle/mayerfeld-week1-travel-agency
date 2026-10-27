import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "./config/passport.js";
import { pool } from "./db/pool.js";
import authRouter from "./routes/auth.js";
import toursRouter from "./routes/tours.js";

for (const key of ["CLIENT_ORIGIN", "SESSION_SECRET", "DATABASE_URL"])
  if (!process.env[key]) throw new Error(`${key} is required`);

const app = express(),
  production = process.env.NODE_ENV === "production";

if (production) app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.use(express.json({ limit: "20kb" }));
// Only the configured frontend may submit state-changing browser requests.
app.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const origin = req.get("origin");
  if (origin && origin !== process.env.CLIENT_ORIGIN)
    return res.status(403).json({ error: "Forbidden origin" });
  next();
});
const PgSession = connectPgSimple(session);
app.use(
  session({
    name: "wayfarer.sid",
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: production,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/tours", toursRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`API listening on ${port}`));
