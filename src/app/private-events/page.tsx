import { Layout } from '@/ui/Layout/Layout';

import { PrivateEventsHero } from './components/PrivateEventsHero/PrivateEventsHero';
import { PrivateEventTypes } from './components/PrivateEventTypes/PrivateEventTypes';
import { PrivateEventsOrderForm } from './components/PrivateEventsOrderForm/PrivateEventsOrderForm';
import { PrivateEventsGallery } from './components/PrivateEventsGallery/PrivateEventsGallery';

export default function PrivateEventsPage() {
  return (
    <Layout>
      <PrivateEventsHero />
      <PrivateEventTypes />
      <PrivateEventsOrderForm />
      <PrivateEventsGallery />
    </Layout>
  );
}
