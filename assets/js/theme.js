const THEME_STORAGE_KEY = "noteboard-theme";
const THEME = {
  LIGHT: "light",
  DARK: "dark"
};

const bodyElement = document.body;
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

function getThemeToggleButton() {
  return document.getElementById("theme-toggle");
}

function setToggleButtonState(isDark) {
  const toggleButton = getThemeToggleButton();
  if (!toggleButton) {
    return;
  }
  toggleButton.textContent = isDark ? "☀️" : "🌙";
  const nextModeLabel = isDark ? "切换到白天模式" : "切换到黑夜模式";
  toggleButton.setAttribute("aria-label", nextModeLabel);
}

function applyTheme(theme) {
  if (!bodyElement) {
    return;
  }
  const isDark = theme === THEME.DARK;
  bodyElement.classList.toggle("dark-theme", isDark);
  setToggleButtonState(isDark);
}

function resolvePreferredTheme() {
  const storedTheme = getStoredTheme();
  if (storedTheme === THEME.DARK || storedTheme === THEME.LIGHT) {
    return storedTheme;
  }
  return mediaQuery.matches ? THEME.DARK : THEME.LIGHT;
}

function handleThemeToggle() {
  const isDark = bodyElement.classList.contains("dark-theme");
  const nextTheme = isDark ? THEME.LIGHT : THEME.DARK;
  applyTheme(nextTheme);
  storeTheme(nextTheme);
}

function handleSystemPreferenceChange(event) {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return;
  }
  applyTheme(event.matches ? THEME.DARK : THEME.LIGHT);
}

function registerSystemPreferenceListener() {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemPreferenceChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleSystemPreferenceChange);
  }
}

function initTheme() {
  applyTheme(resolvePreferredTheme());

  const toggleButton = getThemeToggleButton();
  if (toggleButton) {
    toggleButton.addEventListener("click", handleThemeToggle);
  }

  registerSystemPreferenceListener();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme, { once: true });
} else {
  initTheme();
}

export { applyTheme };

