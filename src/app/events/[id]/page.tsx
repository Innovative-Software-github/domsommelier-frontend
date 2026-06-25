import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getEventById } from '../../../services/events/requests';
import { SITE_NAME } from '@/constants/site';
import { Layout } from '../../../ui/Layout/Layout';
import { EventByIdHeader } from './components/EventByIdHeader/EventByIdHeader';
import { EventByIdInformation } from './components/EventByIdInformation/EventByIdInformation';

/** Один запрос мероприятия на рендер — общий кэш для generateMetadata и страницы. */
const getCachedEvent = cache((id: string) => getEventById(id));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const event = await getCachedEvent(id).catch(() => null);
  if (!event) {
    return { title: 'Мероприятие не найдено', robots: { index: false, follow: false } };
  }

  const description = (
    event.description?.trim() || `${event.title} — мероприятие винного бутика «${SITE_NAME}».`
  ).slice(0, 300);
  const canonical = `/events/${id}`;
  const image = event.largeCover || event.smallCover;

  return {
    title: event.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title: event.title,
      description,
      images: image ? [{ url: image, alt: event.title }] : undefined,
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getCachedEvent(id).catch(() => null);
  if (!event) {
    notFound();
  }

  return (
    <Layout footerTheme="wineRed">
      <EventByIdHeader event={event} />
      <EventByIdInformation eventType={event.type} />
    </Layout>
  );
}
