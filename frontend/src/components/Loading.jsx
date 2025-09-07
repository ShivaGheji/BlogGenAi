import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div aria-busy="true" style={{ padding: 12 }}>
      {text}
    </div>
  );
}
