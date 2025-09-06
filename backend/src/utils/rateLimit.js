import rateLimit from "express-rate-limit";

// rate limit per user for generation to avoid abuse (e.g., 6 per hour)
export default rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 6,
  message: {
    status: "error",
    message: "Too many blog generation requests, try later.",
  },
  keyGenerator: (req) => String(req.user?.id || req.ip),
});
