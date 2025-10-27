'use client';

import { Layout } from '@/ui/Layout/Layout';
import { CategoryLinks } from './_components/CategoryLinks/CategoryLinks';
import { OurMission } from './_components/OurMission/OurMission';
import { NewsSwiperSection } from './_components/NewsSwiperSection/NewsSwiperSection';
import { WineHero } from './_components/WineHero/WineHero';
import { AboutSection } from './_components/AboutSection/AboutSection';
import { Link } from '../ui/Link/Link';
import { ContentContainer } from '../ui/ContentContainer/ContentContainer';

export default function Home() {
  return (
    <Layout>
      <WineHero />
      <AboutSection />
      <CategoryLinks />
      <NewsSwiperSection />
      <OurMission />
      <ContentContainer>
        <Link icon="🔗" size="small" onMouseDown={(e) => console.log(e)}>
          sft
        </Link>
      </ContentContainer>
    </Layout>
  );
}
