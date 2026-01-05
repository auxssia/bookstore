import { CLIENT_CONFIG } from './config.js';

// Initialize Supabase
export const supabase = window.supabase.createClient(
    CLIENT_CONFIG.SUPABASE_URL, 
    CLIENT_CONFIG.SUPABASE_ANON_KEY
);