import { Layout } from '@/ui/Layout/Layout';
import { CategoryLinks } from './_components/CategoryLinks/CategoryLinks';
import { OurMission } from './_components/OurMission/OurMission';
import { NewsSwiperSection } from './_components/NewsSwiperSection/NewsSwiperSection';
import { WineHero } from './_components/WineHero/WineHero';
import { AboutSection } from './_components/AboutSection/AboutSection';

export default function Home() {
  return (
    <Layout>
      <WineHero />
      <AboutSection />
      <CategoryLinks />
      <NewsSwiperSection />
      <OurMission />
    </Layout>
  );
}
