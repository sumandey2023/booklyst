const jwt = require("jsonwebtoken");

const protectedRoute = (req, res, next) => {
  try {
    // Prefer Authorization header Bearer token; fallback to signed cookie
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;
    const cookieToken = req.signedCookies?.token || req.cookies?.token;
    const token = bearerToken || cookieToken;

    if (!token) {
      return res.status(400).json({ message: "Signin first" });
    }

    const secret = process.env.JWT_SECRET || "shhhhh";
    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded.email) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    req.user = decoded.email;
    req.cookie = token;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protectedRoute;
