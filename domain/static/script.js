const button = document.getElementById("generate-btn");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

async function fetchQuote() {
  button.disabled = true;
  button.textContent = "Loading...";

  try {
    const response = await fetch("/api/quote");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    quoteEl.textContent = `"${data.quote}"`;
    authorEl.textContent = `— ${data.author}`;
  } catch (err) {
    quoteEl.textContent = "Couldn't load a quote. Please try again.";
    authorEl.textContent = "";
  } finally {
    button.disabled = false;
    button.textContent = "New Quote";
  }
}

button.addEventListener("click", fetchQuote);
fetchQuote();
