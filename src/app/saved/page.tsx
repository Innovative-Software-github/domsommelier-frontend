import { Layout } from '@/ui/Layout/Layout';
import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle';
import { SavedLayout } from './components/SavedLayout/SavedLayout';

export default async function SavedPage() {
  return (
    <Layout backgroundTheme='gray'>
      <HeaderTitle title="Избранное" />
      <SavedLayout />
    </Layout>
  );
}
