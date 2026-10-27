import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { pool } from "../db/pool.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT id,email,password_hash FROM users WHERE email=$1",
          [email.trim().toLowerCase()],
        );
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password_hash)))
          return done(null, false, { message: "Invalid credentials" });
        return done(null, { id: user.id, email: user.email });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT id,email FROM users WHERE id=$1",
      [id],
    );
    done(null, rows[0] ?? false);
  } catch (error) {
    done(error);
  }
});

export default passport;
