import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../utils/validators";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { register: regUser } = useAuth();
  const nav = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const submit = async (vals) => {
    try {
      await regUser(vals);
      window.__showToast__ &&
        window.__showToast__("Registration successful", "success");
      nav("/dashboard");
    } catch (err) {
      window.__showToast__ &&
        window.__showToast__(
          err?.response?.data?.message || "Registration failed",
          "error"
        );
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>Name</label>
          <input {...register("name")} />
          {formState.errors.name && (
            <div style={{ color: "red" }}>{formState.errors.name.message}</div>
          )}
        </div>

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
