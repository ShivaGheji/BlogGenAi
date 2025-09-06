import { Router } from "express";
import { signUp, signIn, me, signOut } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("/me", requireAuth, me);
authRouter.post("/sign-out", requireAuth, signOut);

export default authRouter;
