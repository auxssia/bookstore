import { supabase } from './supabase.js';

// Handle Sign Up
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for a verification link!");
            window.location.href = 'login.html';
        }
    });
}

// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert(error.message);
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Global Auth State UI
async function updateAuthUI() {
    const authLinks = document.getElementById('auth-links');
    if (!authLinks) return;

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        authLinks.innerHTML = `
            <span>${session.user.email}</span>
            <button id="logout-btn" class="nav-link">Logout</button>
        `;
        document.getElementById('logout-btn').addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.reload();
        });
    } else {
        authLinks.innerHTML = `
            <a href="login.html">Login</a>
            <a href="signup.html" class="btn">Sign Up</a>
        `;
    }
}

updateAuthUI();