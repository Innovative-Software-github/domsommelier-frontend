import { ICustomer } from '@/services/customer/interfaces';
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  AUTH_TOKEN_COOKIE,
  CUSTOMER_ID_COOKIE,
} from './constants';

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export const tokenStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setCookie(AUTH_TOKEN_COOKIE, token);
  },

  removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    removeCookie(AUTH_TOKEN_COOKIE);
  },

  getCustomer(): Partial<ICustomer> | null {
    if (typeof window === 'undefined') return null;

    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setCustomer(customer: Partial<ICustomer>): void {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(customer));

    if (customer.id) {
      setCookie(CUSTOMER_ID_COOKIE, customer.id);
    }
  },

  removeCustomer(): void {
    localStorage.removeItem(AUTH_USER_KEY);
  },

  clear(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    removeCookie(AUTH_TOKEN_COOKIE);
    removeCookie(CUSTOMER_ID_COOKIE);
  },
};
