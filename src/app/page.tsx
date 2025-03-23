import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '../ui/ContentContainer/ContentContainer';
import { CategoryLinks } from './_components/CategoryLinks/CategoryLinks';
import { OurMission } from './_components/OurMission/OurMission';

export default function Home() {
  return (
    <Layout>
      <CategoryLinks />
      <OurMission />
    </Layout>
  );
}
