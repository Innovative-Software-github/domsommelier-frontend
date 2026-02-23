import { Layout } from '@/ui/Layout/Layout';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { AuthGuard } from '@/components/AuthModal/AuthGuard';

export default function ProfilePage() {
  return (
    <Layout backgroundTheme='gray'>
      <AuthGuard>
        <ContentContainer>
          Скам 
        </ContentContainer>
      </AuthGuard>
    </Layout>
  );
}
