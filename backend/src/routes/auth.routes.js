import { Router } from "express";
import { signUp, signIn, me, signOut } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

import { ensureCsrfCookie } from "../middlewares/csrf.middleware.js";

const authRouter = Router();

authRouter.get("/csrf", ensureCsrfCookie, (req, res) => {
  res.json({ message: "CSRF cookie set" });
});

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("/me", requireAuth, me);
authRouter.post("/sign-out", requireAuth, signOut);

export default authRouter;
