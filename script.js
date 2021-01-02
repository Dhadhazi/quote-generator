const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Toggle loading, accepts a boolean
function loading(state) {
  loader.hidden = !state;
  quoteContainer.hidden = state;
}

async function fetchData(url) {
  const res = await fetch(url);
  let data = await res.json();
  return data[0];
}

function displayAuthor(author) {
  authorText.innerText = author === "" ? "Unknown" : author;
}

function displayQuote(quote) {
  if (quote.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = quote;
}

// Get Quote from API
async function getQuote() {
  const apiUrl = "https://stoic-server.herokuapp.com/random";
  try {
    loading(true);
    const data = await fetchData(apiUrl);
    displayAuthor(data.author);
    displayQuote(data.body);
    loading(false);
  } catch (e) {
    console.log(e);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
