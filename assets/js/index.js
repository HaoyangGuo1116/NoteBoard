import { quotes } from "./quotes.js";

const quoteElement = document.getElementById("quote");
const themeToggleButton = document.getElementById("theme-toggle");
const bodyElement = document.body;
const THEME_STORAGE_KEY = "noteboard-theme";
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn("无法从 localStorage 读取主题设置：", error);
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn("无法将主题设置保存到 localStorage：", error);
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  bodyElement.classList.toggle("dark-theme", isDark);

  if (themeToggleButton) {
    themeToggleButton.textContent = isDark ? "☀️" : "🌙";
    const nextModeLabel = isDark ? "切换到白天模式" : "切换到黑夜模式";
    themeToggleButton.setAttribute("aria-label", nextModeLabel);
  }
}

function initializeTheme() {
  const storedTheme = getStoredTheme();
  const themeToApply = storedTheme || (mediaQuery.matches ? "dark" : "light");
  applyTheme(themeToApply);
}

function handleThemeToggle() {
  const isDark = bodyElement.classList.contains("dark-theme");
  const nextTheme = isDark ? "light" : "dark";
  applyTheme(nextTheme);
  storeTheme(nextTheme);
}

initializeTheme();

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", handleThemeToggle);
}

mediaQuery.addEventListener("change", (event) => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return;
  }
  const theme = event.matches ? "dark" : "light";
  applyTheme(theme);
});

function pickRandomQuote() {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return "Keep smiling and keep moving forward.";
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function renderQuote() {
  if (!quoteElement) {
    console.warn("未找到 id 为 quote 的元素。");
    return;
  }
  quoteElement.textContent = pickRandomQuote();
}

renderQuote();

