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
    const container = document.getElementById('auth-links-container');
    if (!container) return;

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        container.innerHTML = `
            <div class="action-item">
                <span>👤 My Account</span>
                <button id="logout-btn" style="background:none; border:none; cursor:pointer; font-size:12px; margin-left:10px;">(Logout)</button>
            </div>
        `;
        document.getElementById('logout-btn').onclick = async () => {
            await supabase.auth.signOut();
            window.location.reload();
        };
    } else {
        container.innerHTML = `<a href="login.html" class="action-item">👤 Login / Sign Up</a>`;
    }
}

updateAuthUI();