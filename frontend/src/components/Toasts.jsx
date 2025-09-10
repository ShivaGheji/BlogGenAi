import React, { useState } from "react";

export default function Toasts() {
  const [items, setItems] = useState([]);

  const push = (msg, type = "info") => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, msg, type }]);
    setTimeout(() => setItems((s) => s.filter((i) => i.id !== id)), 3500);
  };

  const remove = (id) => {
    setItems((s) => s.filter((i) => i.id !== id));
  };

  window.__showToast__ = (m, t) => push(m, t);

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {items.map((it) => (
        <div
          key={it.id}
          className="bg-[#f9f1e0] text-[#5f471d] p-4 rounded-lg shadow-md mb-2 relative flex justify-between items-center max-w-xs"
        >
          <div>
            <p className="font-medium">
              {it.type === "success"
                ? "Success"
                : it.type === "info"
                ? "Info"
                : "Warning"}
            </p>
            <p className="text-sm">{it.msg}</p>
          </div>
          <button
            onClick={() => remove(it.id)}
            className="text-[#5f471d] hover:text-[#5b4824] rounded-full ml-6 p-2 focus:outline-2 focus:outline-orange-800"
          >
            <span className="text-4xl">&times;</span>
          </button>
        </div>
      ))}
    </div>
  );
}
