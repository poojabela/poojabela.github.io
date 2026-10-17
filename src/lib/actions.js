import { profile } from "../constant";

export function toast(message) {
  window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast("Email copied");
  } catch {
    window.location.href = `mailto:${profile.email}`;
  }
}

export function toggleTheme() {
  const next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  document.querySelector('link[rel="icon"]').href =
    next === "dark" ? "/logo-dark.svg" : "/logo.svg";
  try {
    localStorage.setItem("theme", next);
  } catch {}
  toast(next === "dark" ? "Dark mode" : "Light mode");
}

export function openCommandMenu() {
  window.dispatchEvent(new CustomEvent("command-menu:open"));
}
