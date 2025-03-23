import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '../ui/ContentContainer/ContentContainer';
import { CategoryLinks } from './_components/CategoryLinks/CategoryLinks';
import { NewsSwiper } from './_components/NewsSwiper/NewsSwiper';

export default function Home() {
  return (
    <Layout>
      <ContentContainer>
        <CategoryLinks />
        <NewsSwiper />
      </ContentContainer>
    </Layout>
  );
}
