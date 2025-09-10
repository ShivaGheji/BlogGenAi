import rateLimit, { ipKeyGenerator } from "express-rate-limit";

// rate limit per user for generation to avoid abuse (e.g., 6 per hour)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  keyGenerator: (req) => {
    return ipKeyGenerator(req);
  },
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: "Too many requests, please try again later." });
  },
});

export default limiter;
