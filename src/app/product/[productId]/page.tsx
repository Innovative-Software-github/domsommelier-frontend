import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductById } from '../../../services/products/requests';
import { TProduct } from '../../../services/products/interfaces/base';
import { productTypeLabels } from '../../../constants/productTypes';
import { absoluteUrl } from '@/constants/site';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { ProductInformationContainer } from './components/ProductInformationContainer/ProductInformationContainer';
import cls from './page.module.scss';

/** Один запрос продукта на рендер — generateMetadata и страница используют общий кэш. */
const getCachedProduct = cache((id: string) => getProductById(id));

function getProducer(product: TProduct): string | undefined {
  const details = product.details as { producer?: unknown } | null | undefined;
  return details && typeof details.producer === 'string' ? details.producer : undefined;
}

function buildDescription(product: TProduct): string {
  if (product.description && product.description.trim()) {
    return product.description.trim().slice(0, 300);
  }
  const parts = [product.name, product.productCountry, getProducer(product)].filter(Boolean);
  return `${parts.join(', ')}. Купить в винном бутике «Дом сомелье» — доставка и самовывоз.`;
}

function buildProductJsonLd(product: TProduct, productId: string) {
  const images = (product.productPhoto ?? []).map((photo) => photo.url).filter(Boolean);
  const brandName = getProducer(product) ?? product.productCountry;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    ...(images.length > 0 ? { image: images } : {}),
    description: buildDescription(product),
    sku: product.article,
    category: productTypeLabels[product.productCategoryName],
    ...(brandName ? { brand: { '@type': 'Brand', name: brandName } } : {}),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product/${productId}`),
      priceCurrency: 'RUB',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;

  const product = await getCachedProduct(productId).catch(() => null);
  if (!product) {
    return { title: 'Товар не найден', robots: { index: false, follow: false } };
  }

  const description = buildDescription(product);
  const canonical = `/product/${productId}`;
  const image = product.productPhoto?.[0]?.url;

  return {
    title: product.name,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: product.name,
      description,
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await getCachedProduct(productId).catch(() => null);
  if (!product) {
    notFound();
  }

  const jsonLd = buildProductJsonLd(product, productId);

  return (
    <Layout footerClassName={cls.footer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContentContainer className={cls.container}>
        <ProductInformationContainer product={product} />
      </ContentContainer>
    </Layout>
  );
}
