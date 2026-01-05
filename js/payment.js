import { CLIENT_CONFIG } from './config.js';

export function initializePayment(book) {
    const options = {
        "key": CLIENT_CONFIG.RAZORPAY_KEY_ID,
        "amount": book.price * 100, // Amount in paise
        "currency": CLIENT_CONFIG.CURRENCY,
        "name": CLIENT_CONFIG.STORE_NAME,
        "description": `Purchase: ${book.title}`,
        "handler": function (response) {
            alert("Payment Successful! ID: " + response.razorpay_payment_id);
            // Here you could send data to Supabase to record the order
        },
        "prefill": {
            "email": "customer@example.com",
            "contact": "9999999999"
        },
        "theme": { "color": "#1a1a1a" }
    };
    const rzp = new Razorpay(options);
    rzp.open();
}