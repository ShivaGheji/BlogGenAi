import crypto from "crypto";
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME, NODE_ENV } from "../utils/env.js";

export const ensureCsrfCookie = (req, res, next) => {
  if (!req.cookies[CSRF_COOKIE_NAME]) {
    const token = crypto.randomBytes(24).toString("hex");
    res.cookie(CSRF_COOKIE_NAME, token, {
      httpOnly: false,
      sameSite: NODE_ENV == "production" ? "none" : "lax",
      secure: NODE_ENV === "production",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1d
    });
  }
  next();
};

export const csrfProtect = (req, res, next) => {
  const cookieToken = req.cookies[CSRF_COOKIE_NAME];
  const headerToken = req.headers[CSRF_HEADER_NAME];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    const error = new Error("CSRF validation failed");
    error.statusCode = 403;
    return next(error);
  }
  next();
};
