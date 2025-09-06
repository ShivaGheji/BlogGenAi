import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { setAuthCookie, clearAuthCookie } from "../utils/cookies.js";

export const signUp = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const { token, user } = await registerUser(data);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { token, user },
    });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const { token, user } = await loginUser(data);
    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const signOut = (req, res) => {
  try {
    logoutUser(req.user.id);
    clearAuthCookie(res);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
