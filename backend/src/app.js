import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
// import { FRONTEND_ORIGIN } from "./utils/env.js";
// import {
//   ensureCsrfCookie,
//   csrfProtect,
// } from "./middlewares/csrf.middleware.js";
const app = express();

// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use(
//   cors({
//     // origin: FRONTEND_ORIGIN,
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(ensureCsrfCookie);
// app.use(csrfProtect);

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use(errorMiddleware);

export default app;
