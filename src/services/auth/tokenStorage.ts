const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const TOKEN_COOKIE = 'auth_token';

export interface IStoredUser {
  email: string;
  firstName: string;
  secondName: string;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export const tokenStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    setCookie(TOKEN_COOKIE, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    removeCookie(TOKEN_COOKIE);
  },

  getUser(): IStoredUser | null {
    if (typeof window === 'undefined') return null;

    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setUser(user: IStoredUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    removeCookie(TOKEN_COOKIE);
  },
};
