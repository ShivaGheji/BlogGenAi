import crypto from "crypto";
import { CSRF_COOKIE_NAME, NODE_ENV } from "../utils/env.js";

export const ensureCsrfCookie = (req, res, next) => {
  if (!req.cookies[CSRF_COOKIE_NAME]) {
    const token = crypto.randomBytes(24).toString("hex");
    res.cookie(CSRF_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1d
    });
  }
  next();
};

export const csrfProtect = (req, res, next) => {
  const cookieToken = req.cookies[CSRF_COOKIE_NAME];

  if (!cookieToken) {
    const error = new Error("CSRF token missing");
    error.statusCode = 403;
    return next(error);
  }
  next();
};
