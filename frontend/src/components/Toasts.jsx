import React, { useState } from "react";

/*
  Simple toast system. Use showToast(message, type) from a global ref if needed.
  For simplicity this component exposes a function via window.__showToast__
*/

export default function Toasts() {
  const [items, setItems] = useState([]);

  const push = (msg, type = "info") => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, msg, type }]);
    setTimeout(() => setItems((s) => s.filter((i) => i.id !== id)), 3500);
  };

  // expose globally to avoid prop drilling (simple)
  window.__showToast__ = (m, t) => push(m, t);

  return (
    <div style={{ position: "fixed", right: 12, top: 12, zIndex: 9999 }}>
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            margin: 6,
            padding: 8,
            background: "#222",
            color: "#fff",
            borderRadius: 6,
          }}
        >
          {it.msg}
        </div>
      ))}
    </div>
  );
}
