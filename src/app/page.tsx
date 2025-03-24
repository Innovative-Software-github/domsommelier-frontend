import { Layout } from '@/ui/Layout/Layout';
import { CategoryLinks } from './_components/CategoryLinks/CategoryLinks';
import { OurMission } from './_components/OurMission/OurMission';
import { NewsSwiper } from './_components/NewsSwiper/NewsSwiper';

export default function Home() {
  return (
    <Layout>
      <CategoryLinks />
      <OurMission />
      <NewsSwiper />
    </Layout>
  );
}
