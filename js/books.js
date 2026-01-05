import { supabase } from './supabase.js';
import { CLIENT_CONFIG } from './config.js';

// Set Client Branding
document.getElementById('store-name-nav').innerText = CLIENT_CONFIG.STORE_NAME;
if(document.getElementById('hero-title')) {
    document.getElementById('hero-title').innerText = CLIENT_CONFIG.STORE_NAME;
    document.getElementById('hero-tagline').innerText = CLIENT_CONFIG.STORE_TAGLINE;
}

async function fetchBooks() {
    const { data, error } = await supabase.from('books').select('*');
    
    if (error) {
        console.error("Error fetching books:", error);
        return;
    }

    const display = document.getElementById('book-display');
    display.innerHTML = data.map(book => `
        <div class="book-card" onclick="window.location.href='product.html?id=${book.id}'">
            <img src="${book.image_url}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-price">${CLIENT_CONFIG.SYMBOL}${book.price}</p>
                <button class="btn">View Details</button>
            </div>
        </div>
    `).join('');
}

fetchBooks();