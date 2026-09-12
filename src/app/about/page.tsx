import type { Metadata } from 'next';

import { Layout } from '@/ui/Layout/Layout';
import { SITE_NAME } from '@/constants/site';
import { OurMission } from '../_components/OurMission/OurMission';
import { AboutHero } from './components/AboutHero/AboutHero';
import { AboutPrinciples } from './components/AboutPrinciples/AboutPrinciples';
// TODO: блок "Как нас найти" убран со страницы "О нас" по запросу.
// import { AboutContacts } from './components/AboutContacts/AboutContacts';

const ABOUT_DESCRIPTION =
  'Винный бутик «Дом сомелье» в Перми: кто мы, что предлагаем — вино, дегустации, ' +
  'частные мероприятия — и как нас найти.';

export const metadata: Metadata = {
  title: 'О нас',
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    title: `О нас — ${SITE_NAME}`,
    description: ABOUT_DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <Layout>
      <AboutHero />
      <AboutPrinciples />
      <OurMission />
      {/* <AboutContacts /> */}
    </Layout>
  );
}
