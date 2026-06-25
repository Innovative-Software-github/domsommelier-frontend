/**
 * Базовый URL сайта для абсолютных SEO-ссылок (canonical, sitemap, Open Graph).
 * Домен ещё не выбран — задаётся переменной окружения NEXT_PUBLIC_SITE_URL,
 * плейсхолдер используется как дефолт до деплоя.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://domsommelier.ru').replace(/\/+$/, '');

export const SITE_NAME = 'Дом сомелье';

export const SITE_DESCRIPTION =
  'Винный бутик «Дом сомелье»: вино, шампанское и игристые, крепкий алкоголь, закуски и аксессуары. ' +
  'Подбор по вкусу, доставка и самовывоз из винотек.';

/** Абсолютный URL из относительного пути (для sitemap/OG). */
export const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
