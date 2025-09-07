import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../utils/validators";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const submit = async (vals) => {
    try {
      await login(vals);
      window.__showToast__ &&
        window.__showToast__("Logged in successfully", "success");
      nav("/dashboard");
    } catch (err) {
      window.__showToast__ &&
        window.__showToast__(
          err?.response?.data?.message || "Login failed",
          "error"
        );
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>Email</label>
          <input {...register("email")} />
          {formState.errors.email && (
            <div style={{ color: "red" }}>{formState.errors.email.message}</div>
          )}
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {formState.errors.password && (
            <div style={{ color: "red" }}>
              {formState.errors.password.message}
            </div>
          )}
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
