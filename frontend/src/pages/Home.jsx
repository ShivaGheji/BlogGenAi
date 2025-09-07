import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  const start = () => {
    nav("/dashboard");
  };

  return (
    <div>
      <h1>Welcome to AI BlogGen</h1>
      <p>Enter a short prompt and generate a ~1000 word markdown blog.</p>
      <button onClick={start}>Start Generate</button>
    </div>
  );
}
