export function requireAuth(req, res, next) {
  if (!req.isAuthenticated?.() || !req.user?.id)
    return res.status(401).json({ error: "Sign in before booking a tour" });
  next();
}
