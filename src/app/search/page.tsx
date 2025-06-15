import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = (await searchParams) ?? '';

  return (
    <Layout>
      <ContentContainer>
        <p>Query: {query}</p>
      </ContentContainer>
    </Layout>
  );
}
