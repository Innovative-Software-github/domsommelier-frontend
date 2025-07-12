import { Layout } from '@/ui/Layout/Layout';
import { EventBoard } from './components/EventBoard/EventBoard';
import { EventHeader } from './components/EventHeader/EventHeader';
import { EventDatePicker } from './components/EventDatePicker/EventDatePicker';
import { EventFilters } from './components/EventFilters/EventFilters';

export const fakeEvents = [
  {
    id: "1",
    type: "Дегустация",
    price: 1000,
    dateTime: "2024-10-30T19:00:00+03:00",
    title: "Вечер итальянских вин",
    smallCover: "/eventImage.png",
  },
  {
    id: "2",
    type: "Винное казино",
    price: 0,
    dateTime: "2024-11-12T20:00:00+03:00",
    title: "Винное казино: Франция vs Испания",
    smallCover: "/eventImage.png",
  },
  {
    id: "3",
    type: "Дегустация",
    price: 1500,
    dateTime: "2024-12-05T18:30:00+03:00",
    title: "Дегустация шампанских вин",
    smallCover: "/eventImage.png",
  },
  {
    id: "4",
    type: "Винное казино",
    price: 800,
    dateTime: "2024-12-20T19:30:00+03:00",
    title: "Новогоднее винное казино",
    smallCover: "/eventImage.png",
  },
  {
    id: "5",
    type: "Дегустация",
    price: 1200,
    dateTime: "2025-01-15T19:00:00+03:00",
    title: "Дегустация вин Нового Света",
    smallCover: "/eventImage.png",
  },
];

export default function EventsPage() {
  return (
    <Layout>
      <EventHeader />
      <EventDatePicker />
      <EventFilters />
      <EventBoard events={fakeEvents} />
    </Layout>
  );
}
