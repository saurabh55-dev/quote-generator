// Quote data
const quotes = {
    science: [
        {text: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.", author: "Albert Einstein"},
        {text: "Science is not only a disciple of reason but also one of romance and passion.", author: "Stephen Hawking"},
        {text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.", author: "Marie Curie"}
    ],
    inspiration: [
        {text: "The only way to do great work is to love what you do.", author: "Steve Jobs"},
        {text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill"},
        {text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt"}
    ]
};

// DOM elements
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const categorySelect = document.getElementById("category");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const randomBtn = document.getElementById("random-btn");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const increaseFontBtn = document.getElementById("increase-font");
const decreaseFontBtn = document.getElementById("decrease-font");

// App state
let currentCategory = 'all';
let currentQuoteIndex = 0;
let filteredQuotes = [];

// Initialize
function init() {
    // Event listeners
    categorySelect.addEventListener("change", handleCategoryChange);
    prevBtn.addEventListener("click", showPreviousQuote);
    nextBtn.addEventListener("click", showNextQuote);
    randomBtn.addEventListener("click", showRandomQuote);
    darkModeToggle.addEventListener("click", toggleDarkMode);
    increaseFontBtn.addEventListener("click", increaseFontSize);
    decreaseFontBtn.addEventListener("click", decreaseFontSize);

    // Load initial quotes
    handleCategoryChange();
}

// Handle category change
function handleCategoryChange() {
    currentCategory = categorySelect.value;
    currentQuoteIndex = 0;

    if(currentCategory === 'all') {
        // Combine all quotes
        filteredQuotes = [];
        for(const category in quotes) {
            filteredQuotes = filteredQuotes.concat(quotes[category]);
        }
    }else{
        filteredQuotes = quotes[currentCategory] || [];
    }

    if(filteredQuotes.length > 0) {
        displayQuote(filteredQuotes[currentQuoteIndex]);
    }else{
        quoteText.textContent = "No quotes available for this category.";
        quoteAuthor.textContent = "";
    }
}

// Display quote
function displayQuote(quote) {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `- ${quote.author}`;
}

// Navigation functions
function showPreviousQuote() {
    if(filteredQuotes.length == 0) return;
    currentQuoteIndex = (currentQuoteIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    displayQuote(filteredQuotes[currentQuoteIndex]);
}

function showNextQuote() {
    if(filteredQuotes.length == 0) return;
    currentQuoteIndex = (currentQuoteIndex + 1) % filteredQuotes.length;
    displayQuote(filteredQuotes[currentQuoteIndex]);
}

function showRandomQuote() {
    if(filteredQuotes.length == 0) return;
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuoteIndex = randomIndex;
    displayQuote(filteredQuotes[currentQuoteIndex]);
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
}

// Font size controls
function increaseFontSize() {
    const currentSize = parseFloat(window.getComputedStyle(quoteText).fontSize);
    quoteText.style.fontSize = `${currentSize + 2}px`;
}

function decreaseFontSize() {
    const currentSize = parseFloat(window.getComputedStyle(quoteText).fontSize);
    if(currentSize > 12) {  // Prevent font size from going too small
        quoteText.style.fontSize = `${currentSize - 2}px`;
    }
}

// Initialize the app
init();

