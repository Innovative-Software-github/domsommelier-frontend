import type { MetadataRoute } from 'next';
import { productTypeArray } from '@/constants/productTypes';
import { getAllProducts } from '@/services/products/requests';
import { absoluteUrl } from '@/constants/site';

/** Sitemap пересобирается раз в час, а не на каждый запрос. */
export const revalidate = 3600;

const PAGE_SIZE = 200;
const MAX_PAGES = 50; // предохранитель: до 10 000 товаров

/** Перечисляет id всех товаров постранично (бэкенд отдаёт массив без total). */
async function getAllProductIds(): Promise<string[]> {
  const ids: string[] = [];

  for (let page = 0; page < MAX_PAGES; page += 1) {
    let batch: { id: string }[] = [];
    try {
      batch = await getAllProducts(page, PAGE_SIZE);
    } catch {
      break;
    }

    ids.push(...batch.map((product) => product.id));

    if (batch.length < PAGE_SIZE) {
      break;
    }
  }

  return ids;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: absoluteUrl('/events'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...productTypeArray.map((type) => ({
      url: absoluteUrl(`/catalog/${type}`),
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];

  const productRoutes: MetadataRoute.Sitemap = (await getAllProductIds()).map((id) => ({
    url: absoluteUrl(`/product/${id}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
