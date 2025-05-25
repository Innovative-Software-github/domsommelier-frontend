import { TDrinkType } from '../../../constants/routes/catalogRoutes';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { Layout } from '../../../ui/Layout/Layout';
import { CatalogBoard } from '../components/CatalogBoard/CatalogBoard';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useFilters } from '../components/Sidebar/utils';

import cls from './CatalogPage.module.scss';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ type: TDrinkType }>;
}) {
  const { type: drinkType } = await params;

  return (
    <Layout showCatalogLinks={false}>
      <ContentContainer className={cls.container}>
        <Sidebar drinkType={drinkType} />
        <CatalogBoard drinkType={drinkType} />
      </ContentContainer>
    </Layout>
  );
}
