import { quotes } from "./quotes.js";

const quoteElement = document.getElementById("quote");

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

