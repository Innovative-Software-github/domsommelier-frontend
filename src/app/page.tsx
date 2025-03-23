import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '../ui/ContentContainer/ContentContainer';
import { CategoryLinks } from './_components/CategoryLinks/CategoryLinks';

export default function Home() {
  return (
    <Layout>
      <ContentContainer>
        <CategoryLinks />
      </ContentContainer>
    </Layout>
  );
}
