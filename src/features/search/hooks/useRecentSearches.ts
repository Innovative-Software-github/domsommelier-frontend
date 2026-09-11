'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { MIN_SEARCH_QUERY_LENGTH, RECENT_SEARCHES_LIMIT } from '../constants';

/**
 * Недавние запросы пользователя — вместо заглушки «Популярные запросы» в модалке
 * поиска: статистики запросов на бэкенде нет, а свои запросы — реальные данные.
 * Хранятся в localStorage; модалка и страница поиска смонтированы одновременно,
 * поэтому все подписчики обновляются через событие.
 */
const STORAGE_KEY = 'domsommelier:recent-searches';
const CHANGE_EVENT = 'domsommelier:recent-searches-change';
const EMPTY: string[] = [];

let cachedRaw: string | null = null;
let cachedList: string[] = EMPTY;

const readRaw = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const parse = (raw: string | null): string[] => {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string').slice(0, RECENT_SEARCHES_LIMIT)
      : EMPTY;
  } catch {
    return EMPTY;
  }
};

// useSyncExternalStore требует тот же объект, пока данные не менялись.
const getSnapshot = (): string[] => {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedList = parse(raw);
  }
  return cachedList;
};

const getServerSnapshot = (): string[] => EMPTY;

const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

const write = (list: string[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Хранилище недоступно (приватный режим и т.п.) — просто не запоминаем.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export const useRecentSearches = () => {
  const recentSearches = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addRecentSearch = useCallback((query: string) => {
    const normalized = query.trim();
    if (normalized.length < MIN_SEARCH_QUERY_LENGTH) {
      return;
    }

    const rest = getSnapshot().filter((item) => item.toLowerCase() !== normalized.toLowerCase());
    write([normalized, ...rest].slice(0, RECENT_SEARCHES_LIMIT));
  }, []);

  const clearRecentSearches = useCallback(() => write([]), []);

  return { recentSearches, addRecentSearch, clearRecentSearches };
};
