// Quote data
const quotes = {
    science: [
        {
            text: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
             author: "Albert Einstein"
        },
        {
            text: "Science is not only a disciple of reason but also one of romance and passion.", author: "Stephen Hawking"
        },
        {
            text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
             author: "Marie Curie"
        },
        {
            text: "The important thing is to never stop questioning.",
            author: "Albert Einstein"
        },
        {
            text: "Somewhere, something incredible is waiting to be known.",
            author: "Carl Sagan"
        },
        {
            text: "Science is a way of thinking much more than it is a body of knowledge.",
            author: "Carl Sagan"
        },
        {
            text: "If I have seen further it is by standing on the shoulders of giants.",
            author: "Isaac Newton"
        },
        {
            text: "The good thing about science is that it's true whether or not you believe in it.",
            author: "Neil deGrasse Tyson"
        }
    ],
    inspiration: [
        {
            text: "The only way to do great work is to love what you do.", 
            author: "Steve Jobs"
        },
        {
            text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", 
            author: "Winston Churchill"
        },
        {
            text: "Believe you can and you're halfway there.", 
            author: "Theodore Roosevelt"
        },
        {
            text: "The mind is everything. What you think you become.",
            author: "Buddha"
        },
        {
            text: "Your time is limited, so don’t waste it living someone else’s life.",
            author: "Steve Jobs"
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },
        {
            text: "It always seems impossible until it’s done.",
            author: "Nelson Mandela"
        }
    ],
    psychology: [
        {
            text: "The mind is everything. What you think you become.", 
            author: "Buddha"
        },
        {
            text: "You cannot control what happens to you, but you can control your attitude toward what happens to you.", 
            author: "Brian Tracy"
        },
        {
            text: "The greatest discovery of my generation is that a human being can alter his life by altering his attitude.", 
            author: "William James"
        },
        {
            text: "The greatest discovery of my generation is that a human being can alter his life by altering his attitudes.",
            author: "William James"
        },
        {
            text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.",
            author: "Carl Jung"
        },
        {
            text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
            author: "Aristotle"
        },
        {
            text: "Happiness is not something ready made. It comes from your own actions.",
            author: "Dalai Lama"
        },
        {
            text: "Knowing yourself is the beginning of all wisdom.",
            author: "Aristotle"
        }
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
    restoreDarkMode();
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
    if(filteredQuotes.length == 0){
        quoteText.textContent = "Please select a category first.";
        quoteAuthor.textContent = "";
        return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuoteIndex = randomIndex;
    displayQuote(filteredQuotes[currentQuoteIndex]);
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    localStorage.setItem("darkMode", isDarkMode);
}

function restoreDarkMode(){
    const isDark = localStorage.getItem("darkMode") === "true";
    if(isDark){
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "Light Mode";
    }
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

