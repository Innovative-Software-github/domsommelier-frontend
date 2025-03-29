import { Layout } from '@/ui/Layout/Layout';
import { CategoryLinks } from './_components/CategoryLinks/CategoryLinks';
import { OurMission } from './_components/OurMission/OurMission';
import { NewsSwiperSection } from './_components/NewsSwiperSection/NewsSwiperSection';

export default function Home() {
  return (
    <Layout>
      <CategoryLinks />
      <NewsSwiperSection />
      <OurMission />
    </Layout>
  );
}
