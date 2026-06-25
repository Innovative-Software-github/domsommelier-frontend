import type { MetadataRoute } from 'next';
import { SITE_URL, absoluteUrl } from '@/constants/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Служебные/приватные разделы из индекса исключаем.
      disallow: ['/checkout', '/profile', '/basket', '/saved', '/api-back/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
