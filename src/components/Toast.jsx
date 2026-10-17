import { useEffect, useState } from "react";

export default function Toast() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timeout;
    const show = (event) => {
      setMessage(event.detail);
      clearTimeout(timeout);
      timeout = setTimeout(() => setMessage(""), 1600);
    };
    window.addEventListener("toast", show);
    return () => window.removeEventListener("toast", show);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`sticky-note fixed bottom-6 left-1/2 z-50 -translate-x-1/2 -rotate-2 bg-note-yellow px-5 py-2 font-hand text-2xl transition-all duration-200 ${
        message
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
