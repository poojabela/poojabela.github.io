import { useEffect, useState } from "react";
import { copyEmail, toggleTheme } from "../lib/actions";

const shortcuts = [
  { keys: ["⌘", "K"], label: "Open command menu" },
  { keys: ["g", "h"], label: "Go home" },
  { keys: ["g", "w"], label: "Go to writing" },
  { keys: ["g", "b"], label: "Go to books" },
  { keys: ["c"], label: "Copy email" },
  { keys: ["t"], label: "Toggle theme" },
  { keys: ["?"], label: "Show shortcuts" },
];

const destinations = { h: "/", w: "/writing", b: "/books" };

function isTyping(target) {
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

export default function Shortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let pendingG = false;
    let timeout;

    const onKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTyping(event.target) || document.querySelector("[cmdk-dialog]"))
        return;

      if (pendingG) {
        pendingG = false;
        const href = destinations[event.key];
        if (href) window.location.href = href;
        return;
      }

      switch (event.key) {
        case "g":
          pendingG = true;
          clearTimeout(timeout);
          timeout = setTimeout(() => (pendingG = false), 1000);
          break;
        case "c":
          copyEmail();
          break;
        case "t":
          toggleTheme();
          break;
        case "?":
          setOpen((value) => !value);
          break;
        case "Escape":
          setOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-label="Keyboard shortcuts"
        className="paper-card w-full max-w-sm -rotate-1 p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="mb-4 font-hand text-3xl font-bold">Keyboard shortcuts</p>
        <ul className="space-y-3">
          {shortcuts.map((shortcut) => (
            <li
              key={shortcut.label}
              className="flex items-center justify-between text-sm"
            >
              <span>{shortcut.label}</span>
              <span className="flex gap-1">
                {shortcut.keys.map((key) => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
