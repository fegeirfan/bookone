const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
}

type AuthResponse = {
  access_token: string;
  refresh_token?: string;
  user?: { id: string; email?: string };
};

const SESSION_KEY = 'molk_auth_session';

function authHeaders() {
  return {
    apikey: supabaseAnonKey,
    'Content-Type': 'application/json'
  };
}

function persistSession(payload: AuthResponse) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

export function readStoredSession(): AuthResponse | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthResponse;
  } catch {
    return null;
  }
}

export function clearStoredSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function loginWithEmail(email: string, password: string) {
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Login gagal: ${text}`);
  }

  const data = (await response.json()) as AuthResponse;
  persistSession(data);
  return data;
}

export async function registerWithEmail(email: string, password: string) {
  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Daftar gagal: ${text}`);
  }

  const data = (await response.json()) as AuthResponse;
  if (data.access_token) {
    persistSession(data);
  }
  return data;
}

export function loginWithGoogle() {
  const redirectTo = window.location.origin;
  const url = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
  window.location.href = url;
}

export function applySessionFromUrlHash() {
  if (!window.location.hash) return false;
  const hash = window.location.hash.replace(/^#/, '');
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  if (!accessToken) return false;

  const payload: AuthResponse = {
    access_token: accessToken,
    refresh_token: params.get('refresh_token') || undefined
  };
  persistSession(payload);
  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
  return true;
}
