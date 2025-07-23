
import { getEventById } from '../../../services/events/requests';
import { Layout } from '../../../ui/Layout/Layout';
import { EventByIdHeader } from './components/EventByIdHeader/EventByIdHeader';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getEventById(id);

  console.log(event);

  return (
    <Layout>
      <EventByIdHeader event={event} />
    </Layout>
  );
}
